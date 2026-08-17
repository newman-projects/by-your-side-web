import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Phone, ArrowLeft, Users, BookOpen, Calendar, Scale, Heart, Shield } from 'lucide-react'
import { servicesApi } from '../api/services'
import { articlesApi } from '../api/articles'
import { communityApi } from '../api/community'
import Loading from '../components/ui/Loading'

const stats = [
  { value: '2,000+', label: 'גברים טופלו' },
  { value: '15+', label: 'ערים בישראל' },
  { value: '10', label: 'שנות פעילות' },
  { value: '50+', label: 'מתנדבים' },
]

const services = [
  {
    icon: <Users className="text-[#0071e3]" size={22} />,
    title: 'ייעוץ אישי',
    desc: 'פגישות אישיות עם עובדים סוציאליים מוסמכים לתמיכה בגירושין ומשמורת',
    color: 'bg-blue-50',
  },
  {
    icon: <Scale className="text-[#34C759]" size={22} />,
    title: 'ייעוץ משפטי',
    desc: 'ייעוץ משפטי ראשוני ללא עלות בנושאי גירושין, משמורת וניכור הורי',
    color: 'bg-green-50',
  },
  {
    icon: <Heart className="text-[#FF3B30]" size={22} />,
    title: 'קבוצות תמיכה',
    desc: 'קבוצות תמיכה לאבות גרושים — מרחב בטוח לשיתוף ולצמיחה',
    color: 'bg-red-50',
  },
  {
    icon: <Shield className="text-[#FF9500]" size={22} />,
    title: 'שיקום ומניעה',
    desc: 'תוכניות טיפול ושיקום לגברים הסובלים מאלימות במשפחה',
    color: 'bg-orange-50',
  },
  {
    icon: <BookOpen className="text-[#AF52DE]" size={22} />,
    title: 'סדנאות והרצאות',
    desc: 'סדנאות העצמה, הרצאות מקצועיות ומפגשי הדרכה להורות מיטיבה',
    color: 'bg-purple-50',
  },
  {
    icon: <Calendar className="text-[#5AC8FA]" size={22} />,
    title: 'ווביינרים',
    desc: 'מפגשים מקוונים עם מומחים בנושאי גירושין, ילדים ובריאות נפשית',
    color: 'bg-sky-50',
  },
]

const testimonials = [
  {
    text: 'לצדכם נתן לי כלים להתמודד עם הגירושין ולהיות אבא טוב יותר לילדיי. אני אסיר תודה.',
    name: 'דוד כ.',
    location: 'תל אביב',
  },
  {
    text: 'הייעוץ המשפטי והתמיכה האישית שקיבלתי שינו את חיי לחלוטין. אנשים מדהימים.',
    name: 'יוסי מ.',
    location: 'ירושלים',
  },
  {
    text: 'קבוצת התמיכה עזרה לי להבין שאני לא לבד. היה לי קשה מאוד, ולצדכם הצילו אותי.',
    name: 'אמיר ש.',
    location: 'חיפה',
  },
]

function ArticleCard({ article }: { article: { id: string; title: string; subtitle?: string; image_url?: string; created_at: string } }) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-black/5 card-hover"
    >
      {article.image_url ? (
        <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <BookOpen size={36} className="text-[#0071e3]/40" />
        </div>
      )}
      <div className="p-5">
        <p className="text-[12px] text-[#86868b] mb-1.5">
          {new Date(article.created_at).toLocaleDateString('he-IL')}
        </p>
        <h3 className="text-[16px] font-semibold text-[#1d1d1f] leading-snug mb-1 line-clamp-2">
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="text-[13px] text-[#86868b] line-clamp-2">{article.subtitle}</p>
        )}
      </div>
    </Link>
  )
}

function WebinarCard({ webinar }: { webinar: { id: string; title: string; description?: string; scheduled_at: string; duration_minutes: number } }) {
  const date = new Date(webinar.scheduled_at)
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/5 card-hover">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-[#0071e3] uppercase">
            {date.toLocaleDateString('he-IL', { month: 'short' })}
          </span>
          <span className="text-[18px] font-bold text-[#0071e3] leading-none">
            {date.getDate()}
          </span>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-[#1d1d1f] leading-snug line-clamp-2">
            {webinar.title}
          </h3>
          <p className="text-[12px] text-[#86868b]">
            {date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })} | {webinar.duration_minutes} דקות
          </p>
        </div>
      </div>
      {webinar.description && (
        <p className="text-[13px] text-[#86868b] line-clamp-2">{webinar.description}</p>
      )}
    </div>
  )
}

export default function Home() {
  const { data: plans } = useQuery({ queryKey: ['payment-plans'], queryFn: servicesApi.paymentPlans })
  const { data: articles, isLoading: articlesLoading } = useQuery({ queryKey: ['articles'], queryFn: articlesApi.list })
  const { data: webinars } = useQuery({ queryKey: ['webinars'], queryFn: () => communityApi.webinars(true) })

  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/30 pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0071e3]/10 text-[#0071e3] px-4 py-1.5 rounded-full text-[13px] font-medium mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 bg-[#0071e3] rounded-full" />
              מרכז לסיוע מקצועי לאבות גרושים
            </div>

            <h1 className="section-title mb-6 animate-fade-up delay-100">
              אתם לא<br />
              <span className="text-[#0071e3]">לבד.</span>
            </h1>

            <p className="section-subtitle mb-10 max-w-xl animate-fade-up delay-200">
              לצדכם הוא מרכז לתמיכה מקצועית, סיוע נפשי וטיפול לאבות גרושים וגברים נפגעי אלימות. אנחנו כאן בשבילכם.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <Link to="/contact" className="apple-btn apple-btn-primary text-[15px]">
                קבעו פגישה
                <ArrowLeft size={16} className="rotate-180" />
              </Link>
              <a href="tel:0527090457" className="apple-btn apple-btn-secondary text-[15px]">
                <Phone size={15} />
                052-7090457
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1d1d1f] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[#86868b] text-[14px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">השירותים שלנו</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              מגוון שירותים מקצועיים לתמיכה בכל שלבי תהליך הגירושין והמשמורת
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className={`${s.color} rounded-2xl p-6 card-hover border border-white/50`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {s.icon}
                </div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="apple-btn apple-btn-outline">
              כל השירותים
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {webinars && webinars.length > 0 && (
        <section className="py-24 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="section-title mb-3">ווביינרים קרובים</h2>
                <p className="section-subtitle">הצטרפו למפגשים מקוונים עם מומחים</p>
              </div>
              <Link to="/community" className="hidden sm:block text-[#0071e3] text-[14px] font-medium hover:text-[#0077ed] transition-colors">
                הכל ←
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {webinars.slice(0, 3).map(w => (
                <WebinarCard key={w.id} webinar={w} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title mb-3">מאמרים ותוכן</h2>
              <p className="section-subtitle">מידע מקצועי ועדכני לאבות גרושים</p>
            </div>
            <Link to="/articles" className="hidden sm:block text-[#0071e3] text-[14px] font-medium hover:text-[#0077ed] transition-colors">
              כל המאמרים ←
            </Link>
          </div>

          {articlesLoading ? (
            <Loading />
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#86868b]">
              <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
              <p>מאמרים יתווספו בקרוב</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#1d1d1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4 text-white">מה אומרים עלינו</h2>
            <p className="text-[#86868b] text-[17px]">סיפורים אמיתיים מגברים שעברו דרכנו</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 card-hover">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/80 text-[15px] leading-relaxed mb-5">{t.text}</p>
                <div>
                  <p className="text-white font-medium text-[14px]">{t.name}</p>
                  <p className="text-[#86868b] text-[13px]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      {plans && plans.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">מסלולי טיפול</h2>
              <p className="section-subtitle">בחרו את המסלול המתאים לכם</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-7 card-hover ${
                    i === 1
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-[#f5f5f7] text-[#1d1d1f]'
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-3 right-6 bg-white text-[#0071e3] text-[12px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      פופולרי
                    </div>
                  )}
                  {plan.tag && (
                    <span className={`inline-block text-[12px] font-medium px-3 py-1 rounded-full mb-4 ${
                      i === 1 ? 'bg-white/20 text-white' : 'bg-[#0071e3]/10 text-[#0071e3]'
                    }`}>
                      {plan.tag}
                    </span>
                  )}
                  <h3 className="text-[20px] font-bold mb-1">{plan.title}</h3>
                  {plan.subtitle && (
                    <p className={`text-[14px] mb-4 ${i === 1 ? 'text-white/70' : 'text-[#86868b]'}`}>
                      {plan.subtitle}
                    </p>
                  )}
                  <div className="text-[36px] font-bold mb-6">
                    ₪{plan.amount.toLocaleString()}
                  </div>
                  <Link
                    to="/login"
                    className={`w-full block text-center apple-btn ${
                      i === 1 ? 'bg-white text-[#0071e3]' : 'apple-btn-primary'
                    }`}
                  >
                    בחר מסלול
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / Emergency */}
      <section className="py-24 bg-gradient-to-br from-[#0071e3] to-[#00498b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-4">
            זקוקים לעזרה עכשיו?
          </h2>
          <p className="text-white/80 text-[18px] mb-10">
            אנחנו זמינים בימים א׳–ה׳, 08:30–14:30. אם אתם במצב חירום, התקשרו אלינו ישירות.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:0527090457"
              className="apple-btn bg-white text-[#0071e3] text-[16px] shadow-lg"
            >
              <Phone size={16} />
              052-7090457
            </a>
            <Link to="/contact" className="apple-btn bg-white/15 text-white border border-white/30 text-[16px]">
              השאירו פרטים
            </Link>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={28} className="text-red-500" />
          </div>
          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-bold text-[#1d1d1f] mb-4">
            עזרו לנו לעזור לאחרים
          </h2>
          <p className="text-[#86868b] text-[16px] mb-8 leading-relaxed">
            לצדכם פועלת הודות לתרומות ולמתנדבים. כל תרומה עוזרת לנו להגיע ליותר גברים הזקוקים לסיוע.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/donate" className="apple-btn apple-btn-primary">
              <Heart size={15} />
              תרמו עכשיו
            </Link>
            <Link to="/volunteer" className="apple-btn apple-btn-secondary">
              התנדבו
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
