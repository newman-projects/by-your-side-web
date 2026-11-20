import { useState, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Calendar, Clock, Search, Tag, ExternalLink, BookOpen, Plus, X, ImagePlus, Loader2, AlertTriangle } from 'lucide-react'
import { communityApi } from '../api/community'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/ui/Loading'

type Tab = 'webinars' | 'legal'

const CATEGORY_OPTIONS = [
  { value: 'family_law', label: 'דיני משפחה' },
  { value: 'divorce', label: 'גירושין' },
  { value: 'custody', label: 'משמורת' },
  { value: 'property', label: 'רכוש' },
  { value: 'alimony', label: 'מזונות' },
  { value: 'domestic_violence', label: 'אלימות במשפחה' },
  { value: 'parental_rights', label: 'זכויות הורים' },
  { value: 'other', label: 'אחר' },
]

// ── Image upload helpers ─────────────────────────────────────────────────────

function useImageUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, setError: (s: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) { setError('סוג קובץ לא נתמך. השתמשו ב-JPG, PNG או WebP.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('הקובץ גדול מדי. גודל מקסימלי: 5MB.'); return }
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

  return { image, preview, fileRef, handleImage, removeImage }
}

function ImageUploadField({
  preview, onPickFile, onRemove, loading,
}: {
  preview: string | null
  onPickFile: () => void
  onRemove: () => void
  loading: boolean
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תמונה (אופציונלי)</label>
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#e5e7eb]">
          <img src={preview} alt="preview" className="w-full h-48 object-cover" />
          <button type="button" onClick={onRemove}
            className="absolute top-2 left-2 bg-white/90 rounded-full p-1.5 text-[#374151] hover:text-red-600 shadow transition-colors">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={onPickFile} disabled={loading}
          className="w-full h-32 border-2 border-dashed border-[#dbeafe] rounded-2xl flex flex-col items-center justify-center gap-2 text-[#6b7280] hover:border-[#1e40af] hover:text-[#1e40af] hover:bg-[#F8FAFF] transition-all disabled:opacity-50">
          <ImagePlus size={26} />
          <span className="text-[13px] font-medium">לחצו להעלאת תמונה</span>
          <span className="text-[11px] text-[#9ca3af]">JPG, PNG, WebP · עד 5MB</span>
        </button>
      )}
    </div>
  )
}

// ── New Webinar Modal ────────────────────────────────────────────────────────

function NewWebinarModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [duration, setDuration] = useState(60)
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { image, preview, fileRef, handleImage, removeImage } = useImageUpload()
  const qc = useQueryClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('כותרת היא שדה חובה.'); return }
    if (!description.trim()) { setError('תיאור הוא שדה חובה.'); return }
    if (!date) { setError('תאריך הוא שדה חובה.'); return }
    if (!time) { setError('שעה היא שדה חובה.'); return }

    const scheduled_at = new Date(`${date}T${time}:00`).toISOString()

    setLoading(true)
    setError('')
    try {
      await communityApi.createWebinar({
        title: title.trim(),
        description: description.trim(),
        scheduled_at,
        duration_minutes: duration,
        is_active: isActive,
        image,
      })
      await qc.invalidateQueries({ queryKey: ['webinars-all'] })
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'שגיאה ביצירת הווביינר'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#f0f0f0]">
          <h2 className="text-[20px] font-bold text-[#1e3a8a]">ווביינר חדש</h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#374151] transition-colors p-1"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} dir="rtl" className="px-7 py-6 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">כותרת *</label>
            <input type="text" placeholder="כותרת הווביינר" value={title} onChange={e => setTitle(e.target.value)} disabled={loading} className="input w-full" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תיאור *</label>
            <textarea placeholder="תיאור הווביינר..." value={description} onChange={e => setDescription(e.target.value)} disabled={loading} rows={4}
              className="w-full border border-[#e5e7eb] rounded-2xl px-4 py-3 text-[14px] text-[#111827] focus:outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/10 resize-y leading-relaxed disabled:opacity-60" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תאריך *</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} disabled={loading}
                min={new Date().toISOString().split('T')[0]} className="input w-full" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">שעה *</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} disabled={loading} className="input w-full" />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">משך (דקות)</label>
            <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} disabled={loading}
              min={15} max={480} step={15} className="input w-full" />
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setIsActive(v => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${isActive ? 'bg-[#1e40af]' : 'bg-[#d1d5db]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${isActive ? 'right-0.5' : 'left-0.5'}`} />
            </button>
            <span className="text-[13px] font-medium text-[#374151]">פעיל (גלוי למשתמשים)</span>
          </div>

          <ImageUploadField preview={preview} onPickFile={() => fileRef.current?.click()} onRemove={removeImage} loading={loading} />
          <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden"
            onChange={e => handleImage(e, setError)} />

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl px-4 py-3">
              <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />{error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-[14px] text-[#374151] font-medium hover:bg-[#F8FAFF] transition-colors disabled:opacity-60">
              ביטול
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors disabled:opacity-60">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? 'יוצר...' : 'צור ווביינר'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── New Legal Post Modal ─────────────────────────────────────────────────────

function NewLegalPostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { image, preview, fileRef, handleImage, removeImage } = useImageUpload()
  const qc = useQueryClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError('כותרת היא שדה חובה.'); return }
    if (!content.trim()) { setError('תוכן הוא שדה חובה.'); return }
    if (!category) { setError('קטגוריה היא שדה חובה.'); return }

    setLoading(true)
    setError('')
    try {
      await communityApi.createLegalPost({
        title: title.trim(),
        content: content.trim(),
        category,
        subtitle: subtitle.trim() || undefined,
        tags: tags.trim() || undefined,
        image,
      })
      await qc.invalidateQueries({ queryKey: ['legal-posts'] })
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#f0f0f0]">
          <h2 className="text-[20px] font-bold text-[#1e3a8a]">מאמר משפטי חדש</h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#374151] transition-colors p-1"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} dir="rtl" className="px-7 py-6 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">כותרת *</label>
            <input type="text" placeholder="כותרת המאמר" value={title} onChange={e => setTitle(e.target.value)} disabled={loading} className="input w-full" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">כותרת משנה</label>
            <input type="text" placeholder="תיאור קצר (אופציונלי)" value={subtitle} onChange={e => setSubtitle(e.target.value)} disabled={loading} className="input w-full" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">קטגוריה *</label>
            <select value={category} onChange={e => setCategory(e.target.value)} disabled={loading} className="input w-full">
              <option value="">בחרו קטגוריה</option>
              {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תוכן *</label>
            <textarea placeholder="כתבו את תוכן המאמר כאן..." value={content} onChange={e => setContent(e.target.value)} disabled={loading} rows={10}
              className="w-full border border-[#e5e7eb] rounded-2xl px-4 py-3 text-[14px] text-[#111827] focus:outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/10 resize-y leading-relaxed disabled:opacity-60" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">תגיות (מופרדות בפסיקים)</label>
            <input type="text" placeholder="למשל: גירושין, משמורת, זכויות" value={tags} onChange={e => setTags(e.target.value)} disabled={loading} className="input w-full" />
          </div>

          <ImageUploadField preview={preview} onPickFile={() => fileRef.current?.click()} onRemove={removeImage} loading={loading} />
          <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden"
            onChange={e => handleImage(e, setError)} />

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl px-4 py-3">
              <AlertTriangle size={15} className="mt-0.5 flex-shrink-0" />{error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-[14px] text-[#374151] font-medium hover:bg-[#F8FAFF] transition-colors disabled:opacity-60">
              ביטול
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors disabled:opacity-60">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? 'מפרסם...' : 'פרסם מאמר'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Cards ────────────────────────────────────────────────────────────────────

function WebinarCard({ w }: { w: { id: string; title: string; description?: string; image_url?: string; meet_link?: string; scheduled_at: string; duration_minutes: number } }) {
  const d = new Date(w.scheduled_at)
  return (
    <div className="card overflow-hidden">
      {w.image_url
        ? <img src={w.image_url} alt={w.title} className="w-full h-44 object-cover" />
        : <div className="w-full h-44 bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] flex items-center justify-center">
            <Calendar size={40} className="text-[#1e40af]/30" />
          </div>
      }
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1e40af] to-[#2563eb] flex flex-col items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-[9px] font-bold text-white/70 uppercase">{d.toLocaleDateString('he-IL', { month: 'short' })}</span>
            <span className="text-[20px] font-black text-white leading-none">{d.getDate()}</span>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#111827] line-clamp-2 leading-snug">{w.title}</h3>
            <p className="text-[12px] text-[#6b7280] flex items-center gap-1.5 mt-0.5">
              <Clock size={11} />
              {d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })} · {w.duration_minutes} דק׳
            </p>
          </div>
        </div>
        {w.description && <p className="text-[13px] text-[#6b7280] line-clamp-2 mb-4">{w.description}</p>}
        {w.meet_link && (
          <a href={w.meet_link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 btn btn-sm btn-blue">
            הצטרפו לפגישה
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  )
}

function LegalPostCard({ post }: { post: { id: string; title: string; subtitle?: string; category: string; image_url?: string; tags?: string[]; view_count: number } }) {
  return (
    <div className="card overflow-hidden">
      {post.image_url
        ? <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover" />
        : <div className="w-full h-40 bg-gradient-to-br from-[#d1fae5] to-[#dbeafe] flex items-center justify-center">
            <BookOpen size={36} className="text-[#059669]/30" />
          </div>
      }
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="pill pill-blue text-[11px]">
            <Tag size={10} />{post.category}
          </span>
          {post.view_count > 0 && (
            <span className="text-[11px] text-[#9ca3af]">{post.view_count} צפיות</span>
          )}
        </div>
        <h3 className="text-[16px] font-bold text-[#111827] mb-1 line-clamp-2 leading-snug">{post.title}</h3>
        {post.subtitle && <p className="text-[13px] text-[#6b7280] line-clamp-2">{post.subtitle}</p>}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-[#F8FAFF] border border-[#dbeafe] text-[11px] text-[#6b7280] px-2 py-0.5 rounded-full">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Community Page ───────────────────────────────────────────────────────────

export default function Community() {
  const [tab, setTab] = useState<Tab>('webinars')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [showNewWebinar, setShowNewWebinar] = useState(false)
  const [showNewLegal, setShowNewLegal] = useState(false)
  const { isAdmin } = useAuth()

  const { data: webinars, isLoading: webinarsLoading } = useQuery({
    queryKey: ['webinars-all'],
    queryFn: () => communityApi.webinars(false),
  })

  const { data: legalPosts, isLoading: legalLoading } = useQuery({
    queryKey: ['legal-posts', category, search],
    queryFn: () => communityApi.legalPosts(category || undefined, search || undefined),
    enabled: tab === 'legal',
  })

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: communityApi.categories })

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-16">
        <div className="blob w-96 h-96 bg-[#dbeafe]/60 -top-20 -right-20" />
        <div className="blob w-64 h-64 bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="section-eyebrow mb-3">הקהילה שלנו</p>
          <h1 className="section-heading mb-4">ווביינרים ומידע משפטי</h1>
          <p className="section-lead max-w-xl mx-auto">
            מפגשים מקצועיים, מידע משפטי ותוכן מקצועי — יחד נחזק ונצמח
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex gap-1 py-3">
            {([
              { id: 'webinars', label: 'ווביינרים' },
              { id: 'legal',    label: 'מאמרים משפטיים' },
            ] as const).map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-[#1e40af] text-white shadow-md'
                    : 'text-[#6b7280] hover:text-[#1e40af] hover:bg-[#F8FAFF]'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        {/* Webinars */}
        {tab === 'webinars' && (
          <>
            {isAdmin && (
              <div className="flex justify-start mb-6">
                <button
                  onClick={() => setShowNewWebinar(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[13px] font-semibold hover:bg-[#1c3a9e] transition-colors"
                >
                  <Plus size={15} />
                  ווביינר חדש
                </button>
              </div>
            )}
            {webinarsLoading ? <Loading /> :
             webinars && webinars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars.map(w => <WebinarCard key={w.id} w={w} />)}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-[#dbeafe] rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <Calendar size={36} className="text-[#1e40af]" />
                </div>
                <h3 className="text-[20px] font-black text-[#111827] mb-2">אין ווביינרים קרובים</h3>
                <p className="text-[#6b7280] mb-6">בקרוב יתוספו ווביינרים חדשים</p>
                {isAdmin && (
                  <button
                    onClick={() => setShowNewWebinar(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors"
                  >
                    <Plus size={16} />
                    צרו ווביינר ראשון
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Legal Posts */}
        {tab === 'legal' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input type="text" placeholder="חיפוש..." value={search}
                  onChange={e => setSearch(e.target.value)} className="input pr-10 w-full" />
              </div>
              {categories && categories.length > 0 && (
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className="input w-full sm:w-48">
                  <option value="">כל הקטגוריות</option>
                  {categories.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              )}
              {isAdmin && (
                <button
                  onClick={() => setShowNewLegal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e40af] text-white text-[13px] font-semibold hover:bg-[#1c3a9e] transition-colors flex-shrink-0"
                >
                  <Plus size={15} />
                  מאמר חדש
                </button>
              )}
            </div>

            {legalLoading ? <Loading /> :
             legalPosts && legalPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalPosts.map(p => <LegalPostCard key={p.id} post={p} />)}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-[#dbeafe] rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <BookOpen size={36} className="text-[#1e40af]" />
                </div>
                <h3 className="text-[20px] font-black text-[#111827] mb-2">
                  {search || category ? 'לא נמצאו מאמרים' : 'מאמרים משפטיים יתווספו בקרוב'}
                </h3>
                <p className="text-[#6b7280] mb-6">{search || category ? 'נסו לשנות את החיפוש' : 'חיזרו לכאן בקרוב'}</p>
                {isAdmin && !search && !category && (
                  <button
                    onClick={() => setShowNewLegal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e40af] text-white text-[14px] font-semibold hover:bg-[#1c3a9e] transition-colors"
                  >
                    <Plus size={16} />
                    פרסמו מאמר ראשון
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showNewWebinar && <NewWebinarModal onClose={() => setShowNewWebinar(false)} />}
      {showNewLegal && <NewLegalPostModal onClose={() => setShowNewLegal(false)} />}
    </div>
  )
}
