import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Calendar } from 'lucide-react'
import { articlesApi } from '../api/articles'
import Loading from '../components/ui/Loading'

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.get(id!),
    enabled: !!id,
  })

  if (isLoading) return <Loading fullScreen />
  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-2">המאמר לא נמצא</h2>
          <Link to="/articles" className="text-[#0071e3] text-[14px] hover:underline">
            חזרה למאמרים
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero image */}
      {article.image_url && (
        <div className="relative h-[50vh] overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-[#86868b] text-[13px] hover:text-[#1d1d1f] transition-colors mb-8"
        >
          <ArrowRight size={14} />
          חזרה למאמרים
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[#86868b] text-[13px] mb-4">
          <Calendar size={13} />
          {new Date(article.created_at).toLocaleDateString('he-IL', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </div>

        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#1d1d1f] mb-4 leading-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-[19px] text-[#86868b] mb-8 leading-relaxed font-light">
            {article.subtitle}
          </p>
        )}

        <hr className="border-black/5 mb-8" />

        <div
          className="prose prose-lg max-w-none text-[#1d1d1f] leading-relaxed"
          style={{ fontSize: '17px', lineHeight: '1.7' }}
        >
          {article.content.split('\n').map((para, i) => (
            para.trim() ? <p key={i} className="mb-5 text-[#1d1d1f]">{para}</p> : <br key={i} />
          ))}
        </div>

        <hr className="border-black/5 mt-12 mb-8" />

        <Link to="/contact" className="apple-btn apple-btn-primary">
          קבעו פגישה עכשיו
        </Link>
      </div>
    </div>
  )
}
