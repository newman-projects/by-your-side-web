import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Calendar, BookOpen } from 'lucide-react'
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
  if (error || !article) return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#dbeafe] rounded-3xl flex items-center justify-center mx-auto mb-4">
          <BookOpen size={32} className="text-[#1e40af]" />
        </div>
        <h2 className="text-[20px] font-black text-[#111827] mb-2">המאמר לא נמצא</h2>
        <Link to="/articles" className="text-[#1e40af] text-[14px] font-semibold hover:underline">
          ← חזרה למאמרים
        </Link>
      </div>
    </div>
  )

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero image */}
      {article.image_url ? (
        <div className="relative h-[55vh] overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-3xl mx-auto">
            <h1 className="text-white text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-tight drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h1 className="text-white text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <Link to="/articles"
          className="inline-flex items-center gap-1.5 text-[#6b7280] text-[13px] font-medium hover:text-[#1e40af] transition-colors mb-8">
          <ArrowRight size={14} />
          חזרה למאמרים
        </Link>

        {!article.image_url && null}

        <div className="flex items-center gap-2 text-[#6b7280] text-[13px] mb-4">
          <Calendar size={13} />
          {new Date(article.created_at).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {article.image_url && (
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-black text-[#111827] mb-4 leading-tight">
            {article.title}
          </h1>
        )}

        {article.subtitle && (
          <p className="text-[19px] text-[#6b7280] mb-8 leading-relaxed font-light border-r-4 border-[#1e40af] pr-4">
            {article.subtitle}
          </p>
        )}

        <hr className="border-[#dbeafe] mb-8" />

        <div className="text-[#1f2937] leading-relaxed text-[17px]">
          {article.content.split('\n').map((para, i) =>
            para.trim()
              ? <p key={i} className="mb-5">{para}</p>
              : <br key={i} />
          )}
        </div>

        <hr className="border-[#dbeafe] mt-12 mb-8" />

        <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] rounded-3xl p-8 text-center">
          <h3 className="text-[20px] font-black text-white mb-2">זקוקים לעזרה?</h3>
          <p className="text-white/75 text-[14px] mb-5">אנחנו כאן בשבילכם. קבעו פגישה היום.</p>
          <Link to="/contact" className="btn bg-white text-[#1e40af] hover:bg-[#F8FAFF] inline-flex">
            צרו קשר
          </Link>
        </div>
      </div>
    </div>
  )
}
