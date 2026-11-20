import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BookOpen, Search, ChevronLeft, Plus, X, ImagePlus, Loader2, AlertTriangle } from 'lucide-react'
import { articlesApi } from '../api/articles'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/ui/Loading'

// ── New Article Modal ────────────────────────────────────────────────────────

function NewArticleModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const qc = useQueryClient()

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setError('סוג קובץ לא נתמך. השתמשו ב-JPG, PNG או WebP.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('הקובץ גדול מדי. גודל מקסימלי: 5MB.')
      return
    }
    setError('')
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImage(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('כותרת היא שדה חובה.'); return }
    if (!subtitle.trim()) { setError('כותרת משנה היא שדה חובה.'); return }
    if (!content.trim()) { setError('תוכן המאמר הוא שדה חובה.'); return }

    setLoading(true)
    setError('')
    try {
      await articlesApi.create({ title: title.trim(), subtitle: subtitle.trim(), content: content.trim(), image })
      await qc.invalidateQueries({ queryKey: ['articles'] })
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'שגיאה ביצירת המאמר'
      if (msg.includes('401') || msg.includes('Unauthorized'))
        setError('פג תוקף ההתחברות. התחברו מחדש ונסו שוב.')
      else if (msg.includes('500'))
        setError('שגיאת שרת פנימית. נסו שוב מאוחר יותר.')
      else
        setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#f0f0f0]">
          <h2 className="text-[20px] font-bold text-[#1e3a8a]">מאמר חדש</h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#374151] transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} dir="rtl" className="px-7 py-6 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">כותרת *</label>
            <input
              type="text"
              placeholder="כותרת המאמר"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
              className="input w-full"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">כותרת משנה *</label>
            <input
              type="text"
              placeholder="תיאור קצר של המאמר"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              disabled={loading}
              className="input w-full"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תוכן *</label>
            <textarea
              placeholder="כתבו את תוכן המאמר כאן..."
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={loading}
              rows={10}
              className="w-full border border-[#e5e7eb] rounded-2xl px-4 py-3 text-[14px] text-[#111827] focus:outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/10 resize-y leading-relaxed disabled:opacity-60"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תמונה (אופציונלי)</label>
            {preview ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#e5e7eb]">
                <img src={preview} alt="preview" className="w-full h-52 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 left-2 bg-white/90 rounded-full p-1.5 text-[#374151] hover:text-red-600 shadow transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={loading}
                className="w-full h-36 border-2 border-dashed border-[#dbeafe] rounded-2xl flex flex-col items-center justify-center gap-2 text-[#6b7280] hover:border-[#1e40af] hover:text-[#1e40af] hover:bg-[#F8FAFF] transition-all disabled:opacity-50"
              >
                <ImagePlus size={28} />
                <span className="text-[13px] font-medium">לחצו להעלאת תמונה</span>
                <span className="text-[11px] text-[#9ca3af]">JPG, PNG, WebP · עד 5MB</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleImage}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl px-4 py-3">
              <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-[14px] text-[#374151] font-medium hover:bg-[#F8FAFF] transition-colors disabled:opacity-60"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : null}
              {loading ? 'מפרסם...' : 'פרסם מאמר'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Articles Page ────────────────────────────────────────────────────────────

export default function Articles() {
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const { isAdmin } = useAuth()
  const { data: articles, isLoading } = useQuery({ queryKey: ['articles'], queryFn: articlesApi.list })

  const filtered = articles?.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.subtitle?.toLowerCase().includes(search.toLowerCase()) ?? false)
  )

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-16">
        <div className="blob w-96 h-96 bg-[#dbeafe]/60 -top-20 -right-20" />
        <div className="blob w-64 h-64 bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <p className="section-eyebrow mb-3">תוכן מקצועי</p>
              <h1 className="section-heading">מאמרים ומידע</h1>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="חיפוש מאמרים..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input pr-10 bg-white shadow-sm w-full"
                />
              </div>
              {isAdmin && (
                <button
                  onClick={() => setShowNew(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[13px] font-semibold hover:bg-[#1c3a9e] transition-colors flex-shrink-0"
                >
                  <Plus size={15} />
                  מאמר חדש
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        {isLoading ? (
          <Loading />
        ) : filtered && filtered.length > 0 ? (
          <>
            <p className="text-[13px] text-[#9ca3af] mb-6">{filtered.length} מאמרים</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(article => (
                <Link
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className="card group flex flex-col"
                >
                  <div className="relative overflow-hidden h-52 flex-shrink-0">
                    {article.image_url
                      ? <img src={article.image_url} alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] flex items-center justify-center">
                          <BookOpen size={40} className="text-[#1e40af]/30" />
                        </div>
                    }
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider mb-2">
                      {new Date(article.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="text-[17px] font-bold text-[#111827] mb-1.5 line-clamp-2 leading-snug group-hover:text-[#1e40af] transition-colors">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="text-[13px] text-[#6b7280] line-clamp-2 leading-relaxed flex-1">{article.subtitle}</p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-[13px] font-bold text-[#1e40af]">
                      קרא עוד <ChevronLeft size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#dbeafe] rounded-3xl flex items-center justify-center mx-auto mb-5">
              <BookOpen size={36} className="text-[#1e40af]" />
            </div>
            <h3 className="text-[20px] font-black text-[#111827] mb-2">
              {search ? 'לא נמצאו מאמרים' : 'מאמרים יתווספו בקרוב'}
            </h3>
            <p className="text-[#6b7280] mb-6">{search ? 'נסו מילות חיפוש אחרות' : 'חיזרו לכאן בקרוב'}</p>
            {isAdmin && !search && (
              <button
                onClick={() => setShowNew(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors"
              >
                <Plus size={16} />
                פרסמו את המאמר הראשון
              </button>
            )}
          </div>
        )}
      </div>

      {showNew && <NewArticleModal onClose={() => setShowNew(false)} />}
    </div>
  )
}
