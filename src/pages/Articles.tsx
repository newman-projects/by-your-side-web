import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Search, ChevronLeft } from 'lucide-react'
import { articlesApi } from '../api/articles'
import Loading from '../components/ui/Loading'

export default function Articles() {
  const [search, setSearch] = useState('')
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
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="חיפוש מאמרים..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pr-10 bg-white shadow-sm w-full"
              />
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
            <p className="text-[#6b7280]">{search ? 'נסו מילות חיפוש אחרות' : 'חיזרו לכאן בקרוב'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
