import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { grantsApi, type Grant, type UpdateGrantBody } from '../api/grants'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Search, RefreshCw, ExternalLink, X, Loader2, ChevronDown } from 'lucide-react'

const STATUS_LABELS: Record<Grant['status'], string> = {
  new: 'חדש',
  low_score: 'ציון נמוך',
  reviewing: 'בבדיקה',
  approved: 'מאושר',
  submitted: 'הוגש',
  rejected: 'נדחה',
  expired: 'פג תוקף',
}

const STATUS_COLORS: Record<Grant['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  low_score: 'bg-gray-100 text-gray-500',
  reviewing: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  submitted: 'bg-purple-100 text-purple-700',
  rejected: 'bg-red-100 text-red-500',
  expired: 'bg-gray-100 text-gray-400',
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${color}`}>{score}</span>
}

function GrantModal({ grant, onClose }: { grant: Grant; onClose: () => void }) {
  const qc = useQueryClient()
  const [status, setStatus] = useState<Grant['status']>(grant.status)
  const [notes, setNotes] = useState(grant.notes ?? '')
  const [draft, setDraft] = useState(grant.draft ?? '')
  const [saved, setSaved] = useState(false)

  const { mutate: save, isPending } = useMutation({
    mutationFn: (body: UpdateGrantBody) => grantsApi.update(grant.id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['grants'] })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4 rounded-t-3xl">
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] font-bold text-[#1e1b4b] leading-tight">{grant.title}</h2>
            {grant.funder && <p className="text-[13px] text-[#6b7280] mt-0.5">{grant.funder}</p>}
          </div>
          <button onClick={onClose} className="shrink-0 text-[#9ca3af] hover:text-[#374151] transition-colors mt-0.5">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap gap-3 text-[13px]">
            <ScoreBadge score={grant.relevance_score} />
            {grant.amount_text && <span className="text-[#374151] font-medium">💰 {grant.amount_text}</span>}
            {grant.deadline && <span className="text-[#374151]">📅 {new Date(grant.deadline).toLocaleDateString('he-IL')}</span>}
            {grant.geography && <span className="text-[#6b7280]">📍 {grant.geography}</span>}
          </div>

          {grant.focus_areas?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {grant.focus_areas.map(a => (
                <span key={a} className="bg-[#EEF2FF] text-[#4338ca] text-[11px] font-medium px-2.5 py-1 rounded-full">{a}</span>
              ))}
            </div>
          )}

          {grant.score_reason && (
            <div className="bg-[#F8FAFF] border border-[#dbeafe] rounded-2xl p-4 text-[13px] text-[#374151]">
              <p className="font-semibold text-[#1e40af] mb-1">סיבת הציון</p>
              <p>{grant.score_reason}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">סטטוס</label>
            <div className="relative">
              <select
                value={status}
                onChange={e => setStatus(e.target.value as Grant['status'])}
                className="w-full appearance-none border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af] pr-10"
              >
                {(Object.keys(STATUS_LABELS) as Grant['status'][]).map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
              <ChevronDown size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">הערות</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="w-full border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] resize-none focus:outline-none focus:border-[#1e40af]"
              placeholder="הוסף הערות..."
            />
          </div>

          {/* Draft */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">טיוטת בקשה (AI)</label>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={10}
              className="w-full border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] font-mono resize-y focus:outline-none focus:border-[#1e40af]"
              placeholder="טיוטה תיווצר אוטומטית בסריקה הבאה..."
              dir="auto"
            />
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {grant.url && (
              <a href={grant.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#2563eb] hover:underline">
                <ExternalLink size={13} /> מקור
              </a>
            )}
            {grant.apply_url && (
              <a href={grant.apply_url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#16a34a] hover:underline">
                <ExternalLink size={13} /> להגשה
              </a>
            )}
          </div>

          {/* Save */}
          <button
            onClick={() => save({ status, notes: notes || undefined, draft: draft || undefined })}
            disabled={isPending}
            className="w-full py-3 rounded-2xl bg-[#1e40af] text-white font-bold text-[15px] hover:bg-[#1c3a9e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
            {saved ? '✓ נשמר' : 'שמור שינויים'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminGrants() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Grant | null>(null)

  const { data: grants = [], isLoading } = useQuery({
    queryKey: ['grants', statusFilter],
    queryFn: () => grantsApi.list({ status: statusFilter || undefined, limit: 100 }),
    enabled: isAdmin,
  })

  const { mutate: triggerScan, isPending: scanning } = useMutation({
    mutationFn: grantsApi.scan,
    onSuccess: () => {
      setTimeout(() => qc.invalidateQueries({ queryKey: ['grants'] }), 3000)
    },
  })

  if (authLoading) return null

  if (!isAdmin) {
    navigate('/login')
    return null
  }

  const filtered = grants.filter(g =>
    !search ||
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    (g.funder ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: grants.length,
    new: grants.filter(g => g.status === 'new').length,
    reviewing: grants.filter(g => g.status === 'reviewing').length,
    submitted: grants.filter(g => g.status === 'submitted').length,
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFF] px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-[26px] font-black text-[#1e1b4b]">מענקים</h1>
            <p className="text-[13px] text-[#6b7280] mt-0.5">ניהול ומעקב אחר מענקים פוטנציאליים</p>
          </div>
          <button
            onClick={() => triggerScan()}
            disabled={scanning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1e40af] text-white font-semibold text-[14px] hover:bg-[#1c3a9e] transition-colors disabled:opacity-60"
          >
            {scanning ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
            {scanning ? 'סורק...' : 'סריקה ידנית'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'סה״כ', value: stats.total, color: 'text-[#1e1b4b]' },
            { label: 'חדשים', value: stats.new, color: 'text-blue-600' },
            { label: 'בבדיקה', value: stats.reviewing, color: 'text-yellow-600' },
            { label: 'הוגשו', value: stats.submitted, color: 'text-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#e5e7eb] px-4 py-3">
              <p className={`text-[28px] font-black ${s.color}`}>{s.value}</p>
              <p className="text-[12px] text-[#6b7280]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="חיפוש..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-xl pr-9 pl-4 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af]"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-xl px-4 pl-8 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af]"
            >
              <option value="">כל הסטטוסים</option>
              {(Object.entries(STATUS_LABELS) as [Grant['status'], string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-[#e5e7eb] overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-[#1e40af]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#9ca3af]">
              <p className="text-[15px]">לא נמצאו מענקים</p>
              <p className="text-[13px] mt-1">הפעילו סריקה ידנית כדי למצוא מענקים חדשים</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f3f4f6]">
              {filtered.map(grant => (
                <button
                  key={grant.id}
                  onClick={() => setSelected(grant)}
                  className="w-full text-right px-5 py-4 hover:bg-[#F8FAFF] transition-colors flex items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[14px] font-semibold text-[#1e1b4b] truncate">{grant.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#6b7280] flex-wrap">
                      {grant.funder && <span>{grant.funder}</span>}
                      {grant.amount_text && <span>💰 {grant.amount_text}</span>}
                      {grant.deadline && <span>📅 {new Date(grant.deadline).toLocaleDateString('he-IL')}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    <ScoreBadge score={grant.relevance_score} />
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[grant.status]}`}>
                      {STATUS_LABELS[grant.status]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && <GrantModal grant={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
