import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clock, Search, Tag, ExternalLink, BookOpen } from 'lucide-react'
import { communityApi } from '../api/community'
import Loading from '../components/ui/Loading'

type Tab = 'webinars' | 'legal'

function WebinarCard({ webinar }: { webinar: { id: string; title: string; description?: string; image_url?: string; meet_link?: string; scheduled_at: string; duration_minutes: number; is_active: boolean } }) {
  const date = new Date(webinar.scheduled_at)
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5 card-hover">
      {webinar.image_url ? (
        <img src={webinar.image_url} alt={webinar.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <Calendar size={40} className="text-[#0071e3]/30" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-4 text-[12px] text-[#86868b] mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })} ({webinar.duration_minutes} דק׳)
          </span>
        </div>
        <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2 leading-snug">{webinar.title}</h3>
        {webinar.description && (
          <p className="text-[13px] text-[#86868b] mb-4 line-clamp-2 leading-relaxed">{webinar.description}</p>
        )}
        {webinar.meet_link && (
          <a
            href={webinar.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#0071e3] text-[13px] font-medium hover:text-[#0077ed] transition-colors"
          >
            הצטרפו לפגישה
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  )
}

function LegalPostCard({ post }: { post: { id: string; title: string; subtitle?: string; category: string; image_url?: string; tags?: string[]; view_count: number; created_at: string } }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5 card-hover">
      {post.image_url ? (
        <img src={post.image_url} alt={post.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <BookOpen size={36} className="text-green-500/30" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag size={10} />
            {post.category}
          </span>
          {post.view_count > 0 && (
            <span className="text-[11px] text-[#86868b]">{post.view_count} צפיות</span>
          )}
        </div>
        <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-1.5 leading-snug">{post.title}</h3>
        {post.subtitle && (
          <p className="text-[13px] text-[#86868b] line-clamp-2">{post.subtitle}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-[#f5f5f7] text-[11px] text-[#86868b] px-2 py-0.5 rounded-full">
                #{tag}
              </span>
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
    queryKey: ['webinars', false],
    queryFn: () => communityApi.webinars(false),
  })

  const { data: legalPosts, isLoading: legalLoading } = useQuery({
    queryKey: ['legal-posts', category, search],
    queryFn: () => communityApi.legalPosts(category || undefined, search || undefined),
    enabled: tab === 'legal',
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: communityApi.categories,
  })

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title mb-4">הקהילה שלנו</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            ווביינרים מקצועיים ומידע משפטי עדכני — יחד נחזק ונצמח
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            {([
              { id: 'webinars', label: 'ווביינרים' },
              { id: 'legal', label: 'מאמרים משפטיים' },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                  tab === t.id
                    ? 'bg-[#0071e3] text-white shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Webinars */}
        {tab === 'webinars' && (
          <div>
            {webinarsLoading ? (
              <Loading />
            ) : webinars && webinars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars.map(w => <WebinarCard key={w.id} webinar={w} />)}
              </div>
            ) : (
              <div className="text-center py-24">
                <Calendar size={48} className="mx-auto mb-4 text-[#0071e3]/30" />
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">אין ווביינרים קרובים</h3>
                <p className="text-[#86868b]">בקרוב יתוספו ווביינרים חדשים</p>
              </div>
            )}
          </div>
        )}

        {/* Legal Posts */}
        {tab === 'legal' && (
          <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="חיפוש..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pr-9 pl-4 py-2.5 border border-black/10 rounded-xl text-[14px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3]"
                />
              </div>
              {categories && categories.length > 0 && (
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="px-4 py-2.5 border border-black/10 rounded-xl text-[14px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 text-[#1d1d1f]"
                >
                  <option value="">כל הקטגוריות</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              )}
            </div>

            {legalLoading ? (
              <Loading />
            ) : legalPosts && legalPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalPosts.map(p => <LegalPostCard key={p.id} post={p} />)}
              </div>
            ) : (
              <div className="text-center py-24">
                <BookOpen size={48} className="mx-auto mb-4 text-[#0071e3]/30" />
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">לא נמצאו מאמרים</h3>
                <p className="text-[#86868b]">נסו לשנות את החיפוש</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
