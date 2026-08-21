import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clock, Search, Tag, ExternalLink, BookOpen } from 'lucide-react'
import { communityApi } from '../api/community'
import Loading from '../components/ui/Loading'

type Tab = 'webinars' | 'legal'

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

export default function Community() {
  const [tab, setTab] = useState<Tab>('webinars')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

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
          webinarsLoading ? <Loading /> :
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
              <p className="text-[#6b7280]">בקרוב יתוספו ווביינרים חדשים</p>
            </div>
          )
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
                <h3 className="text-[20px] font-black text-[#111827] mb-2">לא נמצאו מאמרים</h3>
                <p className="text-[#6b7280]">נסו לשנות את החיפוש</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
