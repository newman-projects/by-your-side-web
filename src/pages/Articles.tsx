import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search } from 'lucide-react'
import { articlesApi } from '../api/articles'
import Loading from '../components/ui/Loading'

export default function Articles() {
  const [search, setSearch] = useState('')
  const { data: articles, isLoading } = useQuery({ queryKey: ['articles'], queryFn: articlesApi.list })

  const filtered = articles?.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subtitle?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title mb-4">מאמרים ותוכן</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            מידע מקצועי ועדכני לאבות גרושים — כי ידע הוא כוח
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="חיפוש מאמרים..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-3 border border-black/10 rounded-2xl text-[14px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3]"
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-black/5 card-hover"
              >
                {article.image_url ? (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-52 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                    <BookOpen size={40} className="text-[#0071e3]/30" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-[12px] text-[#86868b] mb-2">
                    {new Date(article.created_at).toLocaleDateString('he-IL', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1.5 leading-snug line-clamp-2 group-hover:text-[#0071e3] transition-colors">
                    {article.title}
                  </h3>
                  {article.subtitle && (
                    <p className="text-[13px] text-[#86868b] line-clamp-2 leading-relaxed">{article.subtitle}</p>
                  )}
                  <div className="mt-4 text-[13px] font-medium text-[#0071e3]">קרא עוד ←</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <BookOpen size={48} className="mx-auto mb-4 text-[#0071e3]/30" />
            <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">
              {search ? 'לא נמצאו מאמרים' : 'מאמרים יתווספו בקרוב'}
            </h3>
            <p className="text-[#86868b]">
              {search ? 'נסו מילות חיפוש אחרות' : 'חיזרו בקרוב לתוכן מקצועי חדש'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
