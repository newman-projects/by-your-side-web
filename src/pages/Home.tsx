import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Phone, ArrowLeft, Users, BookOpen, Calendar, Scale,
  Heart, Shield, ChevronLeft, Star,
} from 'lucide-react'
import { servicesApi } from '../api/services'
import { articlesApi } from '../api/articles'
import { communityApi } from '../api/community'
import Loading from '../components/ui/Loading'

/* ── Static data ──────────────────────────────────────── */
const stats = [
  { value: '2,000+', label: 'גברים טופלו' },
  { value: '11', label: 'ערים בישראל' },
  { value: '10+', label: 'שנות פעילות' },
  { value: '50+', label: 'מתנדבים ומטפלים' },
]

const services = [
  { icon: Users,    label: 'ייעוץ אישי',       desc: 'פגישות אישיות עם עובדים סוציאליים מוסמכים',                    color: '#1e40af', bg: '#dbeafe' },
  { icon: Scale,    label: 'ייעוץ משפטי',       desc: 'ייעוץ ראשוני חינמי בנושאי גירושין ומשמורת',                   color: '#059669', bg: '#d1fae5' },
  { icon: Heart,    label: 'קבוצות תמיכה',      desc: 'מרחב בטוח לשיתוף וצמיחה לאבות גרושים',                       color: '#f97316', bg: '#fff7ed' },
  { icon: Shield,   label: 'טיפול ושיקום',      desc: 'תוכניות טיפול לגברים הסובלים מאלימות במשפחה',                 color: '#7c3aed', bg: '#ede9fe' },
  { icon: BookOpen, label: 'סדנאות והרצאות',    desc: 'סדנאות העצמה ומפגשי הדרכה להורות מיטיבה',                    color: '#0891b2', bg: '#cffafe' },
  { icon: Calendar, label: 'ווביינרים',          desc: 'מפגשים מקוונים עם מומחים מכל מקום בארץ',                    color: '#db2777', bg: '#fce7f3' },
]

const testimonials = [
  { stars: 5, text: 'לצדכם נתן לי כלים להתמודד עם הגירושין ולהיות אבא טוב יותר לילדיי. אנשים מדהימים.', name: 'דוד כ.', city: 'תל אביב' },
  { stars: 5, text: 'הייעוץ המשפטי והתמיכה האישית שקיבלתי שינו את חיי. ממליץ בחום לכל אבא גרוש.', name: 'יוסי מ.', city: 'ירושלים' },
  { stars: 5, text: 'קבוצת התמיכה עזרה לי להבין שאני לא לבד. לצדכם הצילו אותי בתקופה הכי קשה.', name: 'אמיר ש.', city: 'חיפה' },
]

/* ── Sub-components ───────────────────────────────────── */
function ArticleCard({ a }: { a: { id: string; title: string; subtitle?: string; image_url?: string; created_at: string } }) {
  return (
    <Link to={`/articles/${a.id}`} className="card group flex flex-col">
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        {a.image_url
          ? <img src={a.image_url} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] flex items-center justify-center">
              <BookOpen size={40} className="text-[#1e40af]/30" />
            </div>
        }
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-2">
          {new Date(a.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}
        </p>
        <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#1e40af] transition-colors">
          {a.title}
        </h3>
        {a.subtitle && <p className="text-[13px] text-[#6b7280] line-clamp-2 flex-1">{a.subtitle}</p>}
        <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[#1e40af]">
          קרא עוד <ChevronLeft size={14} />
        </div>
      </div>
    </Link>
  )
}

function WebinarCard({ w }: { w: { id: string; title: string; description?: string; scheduled_at: string; duration_minutes: number } }) {
  const d = new Date(w.scheduled_at)
  return (
    <div className="card p-5 flex gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e40af] to-[#2563eb] flex flex-col items-center justify-center flex-shrink-0 shadow-md">
        <span className="text-[10px] font-bold text-white/70 uppercase">
          {d.toLocaleDateString('he-IL', { month: 'short' })}
        </span>
        <span className="text-[22px] font-black text-white leading-none">{d.getDate()}</span>
      </div>
      <div className="min-w-0">
        <h3 className="text-[15px] font-bold text-[#111827] line-clamp-2 leading-snug mb-1">{w.title}</h3>
        <p className="text-[12px] text-[#6b7280]">
          {d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })} · {w.duration_minutes} דקות
        </p>
        {w.description && <p className="text-[12px] text-[#9ca3af] line-clamp-1 mt-1">{w.description}</p>}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────── */
export default function Home() {
  const { data: plans } = useQuery({ queryKey: ['payment-plans'], queryFn: servicesApi.paymentPlans })
  const { data: articles, isLoading: articlesLoading } = useQuery({ queryKey: ['articles'], queryFn: articlesApi.list })
  const { data: webinars } = useQuery({ queryKey: ['webinars'], queryFn: () => communityApi.webinars(true) })

  return (
    <div dir="rtl">

      {/* ════ HERO ════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#F8FAFF]">
        {/* Decorative blobs (matches app landing screen) */}
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/60 top-[-80px] right-[-100px]" />
        <div className="blob w-[380px] h-[380px] bg-[#ede9fe]/50 bottom-[-60px] left-[-60px]" />
        <div className="blob w-[250px] h-[250px] bg-[#fff7ed]/70 top-[30%] left-[20%]" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text side */}
            <div>
              <div className="pill pill-blue mb-6 anim-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af]" />
                מרכז לסיוע מקצועי לאבות גרושים
              </div>

              <h1 className="section-heading mb-5 anim-fade-up delay-1">
                אתם לא<br />
                <span className="text-[#1e40af]">לבד.</span>
              </h1>

              <p className="section-lead max-w-lg mb-8 anim-fade-up delay-2">
                לצדכם הוא מרכז לתמיכה מקצועית, סיוע נפשי וטיפול לאבות גרושים וגברים נפגעי אלימות. אנחנו כאן בשבילכם.
              </p>

              {/* Action buttons like the app */}
              <div className="flex flex-col sm:flex-row gap-3 anim-fade-up delay-3">
                <Link to="/contact" className="btn btn-blue btn-lg">
                  קבעו פגישה
                  <ArrowLeft size={17} className="rotate-180" />
                </Link>
                <a href="tel:0527090457" className="btn btn-outline btn-lg">
                  <Phone size={16} />
                  052-7090457
                </a>
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-3 mt-8 anim-fade-up delay-4">
                <div className="flex -space-x-2 space-x-reverse">
                  {['ד', 'י', 'א'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#1e40af] to-[#2563eb] flex items-center justify-center text-white text-[11px] font-bold">
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-[#6b7280]">
                  <span className="font-bold text-[#111827]">2,000+</span> גברים כבר קיבלו עזרה
                </p>
              </div>
            </div>

            {/* Logo / Visual side */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#1e40af]/10 to-[#ede9fe]/40 scale-110 blur-xl" />
                <div className="relative bg-white/70 backdrop-blur-sm rounded-[40px] p-10 border border-white shadow-2xl anim-float">
                  <img src="/logo.png" alt="לצדכם" className="w-64 h-auto drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 48" className="w-full block" preserveAspectRatio="none" style={{ height: 48 }}>
            <path d="M0,48 C480,0 960,0 1440,48 L1440,48 L0,48 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-[#dbeafe] bg-[#F8FAFF]">
                <div className="text-[2.25rem] font-black text-[#1e40af] mb-1 leading-none">{s.value}</div>
                <div className="text-[13px] text-[#6b7280] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICES ════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">מה אנחנו מציעים</p>
            <h2 className="section-heading mb-4">השירותים שלנו</h2>
            <p className="section-lead max-w-xl mx-auto">
              מגוון שירותים מקצועיים ואנושיים לתמיכה בכל שלב של תהליך הגירושין
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="card card-accent p-6 group">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ background: s.bg }}
                  >
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#111827] mb-2">{s.label}</h3>
                  <p className="text-[13.5px] text-[#6b7280] leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn btn-outline">
              כל השירותים
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════ DONATE + VOLUNTEER CTA ════ */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donate card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e40af] to-[#2563eb] p-8 text-white">
              <div className="blob w-48 h-48 bg-white/10 -top-10 -right-10" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                  <Heart size={22} className="text-white" />
                </div>
                <h3 className="text-[24px] font-black mb-2">תרמו ועזרו</h3>
                <p className="text-white/75 text-[14px] leading-relaxed mb-6">
                  כל תרומה מאפשרת לנו להגיע ליותר גברים שזקוקים לעזרה.
                </p>
                <Link to="/donate" className="btn btn-ghost">
                  <Heart size={15} />
                  תרמו עכשיו
                </Link>
              </div>
            </div>

            {/* Volunteer card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#059669] to-[#10b981] p-8 text-white">
              <div className="blob w-48 h-48 bg-white/10 -top-10 -left-10" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                  <Users size={22} className="text-white" />
                </div>
                <h3 className="text-[24px] font-black mb-2">הצטרפו כמתנדבים</h3>
                <p className="text-white/75 text-[14px] leading-relaxed mb-6">
                  תרמו מזמנכם ומומחיותכם לטובת גברים הזקוקים לכם.
                </p>
                <Link to="/volunteer" className="btn btn-ghost">
                  <Users size={15} />
                  הגישו מועמדות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ WEBINARS ════ */}
      {webinars && webinars.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-eyebrow mb-2">מפגשים קרובים</p>
                <h2 className="section-heading">ווביינרים</h2>
              </div>
              <Link to="/community" className="hidden sm:flex items-center gap-1 text-[#1e40af] text-[14px] font-semibold hover:text-[#1c3a9e] transition-colors">
                לכל הווביינרים <ChevronLeft size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {webinars.slice(0, 3).map(w => <WebinarCard key={w.id} w={w} />)}
            </div>
          </div>
        </section>
      )}

      {/* ════ ARTICLES ════ */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-eyebrow mb-2">תוכן מקצועי</p>
              <h2 className="section-heading">מאמרים ומידע</h2>
            </div>
            <Link to="/articles" className="hidden sm:flex items-center gap-1 text-[#1e40af] text-[14px] font-semibold hover:text-[#1c3a9e] transition-colors">
              כל המאמרים <ChevronLeft size={15} />
            </Link>
          </div>

          {articlesLoading ? (
            <Loading />
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map(a => <ArticleCard key={a.id} a={a} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen size={44} className="mx-auto mb-4 text-[#1e40af]/25" />
              <p className="text-[#6b7280]">מאמרים יתווספו בקרוב</p>
            </div>
          )}
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="py-20 bg-[#1e40af] overflow-hidden relative">
        <div className="blob w-[600px] h-[600px] bg-[#2563eb]/50 -top-40 -right-40" />
        <div className="blob w-[400px] h-[400px] bg-[#1c3a9e]/60 bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-white/60 text-[13px] font-bold uppercase tracking-widest mb-3">מה אומרים עלינו</p>
            <h2 className="section-heading-white">סיפורים אמיתיים</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-7">
                <div className="flex gap-1 mb-4">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
                  ))}
                </div>
                <p className="text-white/85 text-[15px] leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[13px]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[14px]">{t.name}</p>
                    <p className="text-white/50 text-[12px]">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PAYMENT PLANS ════ */}
      {plans && plans.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="text-center mb-14">
              <p className="section-eyebrow mb-3">מסלולי טיפול</p>
              <h2 className="section-heading mb-4">בחרו את המסלול שלכם</h2>
              <p className="section-lead max-w-xl mx-auto">תוכניות גמישות המותאמות לכל שלב בתהליך</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const featured = i === 1
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-7 transition-all ${
                      featured
                        ? 'bg-gradient-to-br from-[#1e40af] to-[#2563eb] text-white shadow-2xl scale-[1.03]'
                        : 'bg-[#F8FAFF] border border-[#dbeafe] hover:border-[#1e40af]/30'
                    }`}
                  >
                    {featured && (
                      <div className="absolute -top-3.5 right-6 bg-[#f97316] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                        הכי פופולרי ✦
                      </div>
                    )}
                    {plan.tag && (
                      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${
                        featured ? 'bg-white/20 text-white' : 'bg-[#dbeafe] text-[#1e40af]'
                      }`}>
                        {plan.tag}
                      </span>
                    )}
                    <h3 className={`text-[20px] font-black mb-1 ${featured ? 'text-white' : 'text-[#111827]'}`}>{plan.title}</h3>
                    {plan.subtitle && (
                      <p className={`text-[13px] mb-4 ${featured ? 'text-white/70' : 'text-[#6b7280]'}`}>{plan.subtitle}</p>
                    )}
                    <div className={`text-[42px] font-black leading-none mb-6 ${featured ? 'text-white' : 'text-[#1e40af]'}`}>
                      ₪{plan.amount.toLocaleString()}
                    </div>
                    <Link
                      to="/login"
                      className={`btn w-full justify-center ${featured ? 'bg-white text-[#1e40af] hover:bg-[#F8FAFF]' : 'btn-blue'}`}
                    >
                      בחר מסלול
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════ EMERGENCY CTA ════ */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_48px_rgba(30,64,175,0.12)] border border-[#dbeafe]">
            <div className="w-16 h-16 rounded-2xl bg-[#dbeafe] flex items-center justify-center mx-auto mb-6 anim-pulse">
              <Phone size={28} className="text-[#1e40af]" />
            </div>
            <h2 className="section-heading mb-4">זקוקים לעזרה עכשיו?</h2>
            <p className="section-lead mb-8">
              פעילים בימים א׳–ה׳, 08:30–14:30. לא מחכים — מתקשרים.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:0527090457" className="btn btn-blue btn-lg">
                <Phone size={16} />
                052-7090457
              </a>
              <Link to="/contact" className="btn btn-outline btn-lg">
                השאירו פרטים
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
