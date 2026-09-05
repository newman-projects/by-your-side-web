import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Download, ExternalLink, RefreshCw, Calendar, User, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { courtRulingsApi, type CourtRuling } from '../api/courtRulings'

const PAGE_SIZE = 20

export default function CourtRulings() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [rulings, setRulings] = useState<CourtRuling[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [triggerOpen, setTriggerOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [triggering, setTriggering] = useState(false)
  const [triggerMsg, setTriggerMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/')
  }, [authLoading, isAdmin, navigate])

  const fetchRulings = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await courtRulingsApi.list(p * PAGE_SIZE, PAGE_SIZE)
      setRulings(res.items)
      setTotal(res.total)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'שגיאה בטעינת הפסיקות')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) fetchRulings(page)
  }, [isAdmin, page, fetchRulings])

  const handleTrigger = async () => {
    setTriggering(true)
    setTriggerMsg(null)
    try {
      const req: { date_from?: string; date_to?: string } = {}
      if (dateFrom) req.date_from = dateFrom
      if (dateTo) req.date_to = dateTo
      await courtRulingsApi.trigger(req)
      setTriggerMsg('האיסוף הופעל בהצלחה. הפסיקות יופיעו בטבלה לאחר כמה דקות.')
      setTriggerOpen(false)
    } catch (e: unknown) {
      setTriggerMsg(e instanceof Error ? e.message : 'שגיאה בהפעלת האיסוף')
    } finally {
      setTriggering(false)
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" dir="rtl">
        <div className="text-[#6b7280]">טוען...</div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFF] pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#1e3a8a]">פסיקות בית משפט לענייני משפחה</h1>
            <p className="text-[14px] text-[#6b7280] mt-1">
              {total > 0 ? `${total} פסיקות נמצאו` : 'לא נמצאו פסיקות'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchRulings(page)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#dbeafe] bg-white text-[#1e40af] text-[13px] font-medium hover:bg-[#F0F4FF] transition-colors"
            >
              <RefreshCw size={14} />
              רענן
            </button>
            <button
              onClick={() => { setTriggerOpen(true); setTriggerMsg(null) }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e40af] text-white text-[13px] font-medium hover:bg-[#1c3a9e] transition-colors"
            >
              <RefreshCw size={14} />
              הפעל איסוף
            </button>
          </div>
        </div>

        {/* Trigger success/error message */}
        {triggerMsg && (
          <div className={`mb-6 p-4 rounded-xl text-[13px] font-medium ${
            triggerMsg.includes('שגיאה')
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {triggerMsg}
          </div>
        )}

        {/* Trigger modal */}
        {triggerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setTriggerOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
              <h2 className="text-[18px] font-bold text-[#1e3a8a] mb-4">הפעל איסוף פסיקות</h2>
              <p className="text-[13px] text-[#6b7280] mb-4">
                השאר ריק לשימוש בתאריכי ברירת מחדל (שנה אחרונה). ניתן לציין טווח תאריכים ספציפי.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">מתאריך (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    placeholder="01/01/2025"
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                    className="w-full border border-[#e5e7eb] rounded-xl px-3 py-2 text-[13px] focus:outline-none focus:border-[#1e40af]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] mb-1">עד תאריך (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    placeholder="31/12/2025"
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                    className="w-full border border-[#e5e7eb] rounded-xl px-3 py-2 text-[13px] focus:outline-none focus:border-[#1e40af]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setTriggerOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-[#e5e7eb] text-[13px] text-[#374151] hover:bg-[#F8FAFF] transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleTrigger}
                  disabled={triggering}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#1e40af] text-white text-[13px] font-medium hover:bg-[#1c3a9e] transition-colors disabled:opacity-60"
                >
                  {triggering ? 'מפעיל...' : 'הפעל'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                <div className="h-5 bg-[#e5e7eb] rounded w-2/3 mb-3" />
                <div className="h-4 bg-[#e5e7eb] rounded w-1/3 mb-4" />
                <div className="h-16 bg-[#e5e7eb] rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && rulings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <FileText size={48} className="text-[#dbeafe]" />
            <p className="text-[16px] font-semibold text-[#6b7280]">אין פסיקות עדיין</p>
            <p className="text-[13px] text-[#9ca3af]">לחץ על "הפעל איסוף" כדי לאסוף פסיקות מהאינטרנט</p>
          </div>
        )}

        {/* Rulings list */}
        {!loading && rulings.length > 0 && (
          <div className="flex flex-col gap-4">
            {rulings.map(ruling => (
              <RulingCard key={ruling.id} ruling={ruling} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-[#dbeafe] text-[13px] text-[#1e40af] disabled:opacity-40 hover:bg-[#F0F4FF] transition-colors"
            >
              <ChevronRight size={14} />
              הקודם
            </button>
            <span className="text-[13px] text-[#6b7280]">
              עמוד {page + 1} מתוך {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-[#dbeafe] text-[13px] text-[#1e40af] disabled:opacity-40 hover:bg-[#F0F4FF] transition-colors"
            >
              הבא
              <ChevronLeft size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function RulingCard({ ruling }: { ruling: CourtRuling }) {
  const [expanded, setExpanded] = useState(false)

  const formattedDate = ruling.created_at
    ? new Date(ruling.created_at).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 sm:p-6">

        {/* API limit warning badge */}
        {ruling.api_limit_reached && (
          <div className="flex items-center gap-1.5 mb-3 text-[12px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 w-fit">
            <AlertTriangle size={12} />
            נאסף חלקית — מגבלת API הושגה
          </div>
        )}

        {/* Title */}
        <h2 className="text-[17px] font-bold text-[#1e3a8a] leading-snug mb-1">
          {ruling.title}
        </h2>

        {/* Subtitle */}
        {ruling.subtitle && (
          <p className="text-[13.5px] text-[#374151] mb-3">{ruling.subtitle}</p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[12px] text-[#6b7280]">
          {ruling.case_number && (
            <span className="bg-[#F0F4FF] text-[#1e40af] rounded-lg px-2.5 py-1 font-semibold">
              תיק {ruling.case_number}
            </span>
          )}
          {ruling.judges && (
            <span className="flex items-center gap-1">
              <User size={12} />
              {ruling.judges}
            </span>
          )}
          {(ruling.case_date || formattedDate) && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {ruling.case_date || formattedDate}
            </span>
          )}
        </div>

        {/* Quick summary */}
        {ruling.quick_summary && (
          <div className="mb-4">
            <div
              className={`text-[13.5px] text-[#374151] leading-relaxed whitespace-pre-line ${!expanded ? 'line-clamp-3' : ''}`}
            >
              {ruling.quick_summary}
            </div>
            {ruling.quick_summary.length > 200 && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="mt-1 text-[12px] text-[#1e40af] hover:underline font-medium"
              >
                {expanded ? 'הצג פחות' : 'קרא עוד'}
              </button>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {ruling.download_url && (
            <a
              href={ruling.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e40af] text-white text-[12.5px] font-semibold hover:bg-[#1c3a9e] transition-colors"
            >
              <Download size={13} />
              הורד פסיקה
            </a>
          )}
          {ruling.gov_url && (
            <a
              href={ruling.gov_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#dbeafe] text-[#1e40af] text-[12.5px] font-semibold hover:bg-[#F0F4FF] transition-colors"
            >
              <ExternalLink size={13} />
              ראה באתר הממשלה
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
