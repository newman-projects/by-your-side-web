import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowLeft, Phone, CheckCircle, Users, Scale, Heart, Shield, BookOpen, Calendar } from 'lucide-react'
import { servicesApi } from '../api/services'
import Loading from '../components/ui/Loading'

const staticServices = [
  {
    icon: Users,  color: '#1e40af', bg: '#dbeafe',
    title: 'ייעוץ אישי',
    desc: 'פגישות אישיות עם עובד סוציאלי מוסמך. אנחנו מקשיבים, מבינים ומסייעים לך לנווט את תהליך הגירושין.',
    features: ['פגישות אישיות', 'תמיכה רגשית', 'כלים מעשיים', 'מעקב שוטף'],
    price: 'ייעוץ ראשוני חינם',
  },
  {
    icon: Scale,  color: '#059669', bg: '#d1fae5',
    title: 'ייעוץ משפטי',
    desc: 'ייעוץ משפטי ראשוני חינמי בנושאי גירושין, משמורת, ניכור הורי וזכויות האב.',
    features: ['פגישה ראשונה ללא עלות', 'נושאי משמורת', 'ניכור הורי', 'זכויות האב'],
    price: 'פגישה ראשונה חינמית',
  },
  {
    icon: Heart,  color: '#f97316', bg: '#fff7ed',
    title: 'קבוצות תמיכה',
    desc: 'קבוצות תמיכה שבועיות לאבות גרושים — מרחב בטוח, מכבד ומחבק לשיתוף וצמיחה.',
    features: ['מפגשים שבועיים', 'קבוצות קטנות', 'מנחה מקצועי', 'אנונימי ובטוח'],
    price: 'בתיאום אישי',
  },
  {
    icon: Shield, color: '#7c3aed', bg: '#ede9fe',
    title: 'טיפול פסיכולוגי',
    desc: 'טיפול פרטני לגברים המתמודדים עם תוצאות נפשיות של גירושין, אלימות וסכסוכי משמורת.',
    features: ['טיפול CBT', 'עיבוד טראומה', 'בניית עמידות', 'כלי הורות'],
    price: 'לפי הסכם',
  },
  {
    icon: BookOpen, color: '#0891b2', bg: '#cffafe',
    title: 'סדנאות',
    desc: 'סדנאות העצמה, הרצאות מקצועיות ומפגשי הדרכה להורות מיטיבה ולהתמודדות עם גירושין.',
    features: ['הורות משותפת', 'כלים רגשיים', 'מומחים מוזמנים', 'מפגשים מעשיים'],
    price: 'לפי תוכנית',
  },
  {
    icon: Calendar, color: '#db2777', bg: '#fce7f3',
    title: 'ווביינרים מקוונים',
    desc: 'מפגשים מקוונים עם מומחים בנושאי גירושין, ילדים ובריאות נפשית — מכל מקום בארץ.',
    features: ['זמין מכל מקום', 'מומחים מובילים', 'שאלות ותשובות', 'תיעוד מפגשים'],
    price: 'חינם / בתשלום סמלי',
  },
]

export default function Services() {
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['payment-plans'],
    queryFn: servicesApi.paymentPlans,
  })

  return (
    <div dir="rtl" className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-16">
        <div className="blob w-96 h-96 bg-[#dbeafe]/60 -top-20 -right-20" />
        <div className="blob w-64 h-64 bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="section-eyebrow mb-3">מה אנחנו מציעים</p>
          <h1 className="section-heading mb-4">השירותים שלנו</h1>
          <p className="section-lead max-w-xl mx-auto">
            מגוון שירותים מקצועיים ואנושיים לתמיכה בכל שלב של תהליך הגירושין
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticServices.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="card card-accent p-7">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm" style={{ background: s.bg }}>
                    <Icon size={22} style={{ color: s.color }} />
                  </div>
                  <div className="pill mb-3 text-[11px]" style={{ background: s.bg, color: s.color }}>
                    {s.price}
                  </div>
                  <h3 className="text-[20px] font-black text-[#111827] mb-2">{s.title}</h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#1f2937] font-medium">
                        <CheckCircle size={14} style={{ color: s.color }} className="flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">מסלולי טיפול</p>
            <h2 className="section-heading mb-4">בחרו את המסלול שלכם</h2>
            <p className="section-lead max-w-xl mx-auto">תוכניות גמישות המותאמות לכל שלב בתהליך</p>
          </div>

          {plansLoading ? (
            <Loading />
          ) : plans && plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const featured = i === 1
                return (
                  <div key={plan.id} className={`relative rounded-3xl p-7 transition-all ${
                    featured
                      ? 'bg-gradient-to-br from-[#1e40af] to-[#2563eb] shadow-2xl scale-[1.03]'
                      : 'bg-white border border-[#dbeafe] card'
                  }`}>
                    {featured && (
                      <div className="absolute -top-3.5 right-6 bg-[#f97316] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow">
                        הכי פופולרי ✦
                      </div>
                    )}
                    {plan.tag && (
                      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${
                        featured ? 'bg-white/20 text-white' : 'bg-[#dbeafe] text-[#1e40af]'
                      }`}>{plan.tag}</span>
                    )}
                    <h3 className={`text-[20px] font-black mb-1 ${featured ? 'text-white' : 'text-[#111827]'}`}>{plan.title}</h3>
                    {plan.subtitle && (
                      <p className={`text-[13px] mb-4 ${featured ? 'text-white/70' : 'text-[#6b7280]'}`}>{plan.subtitle}</p>
                    )}
                    {plan.description && (
                      <p className={`text-[12px] mb-5 leading-relaxed ${featured ? 'text-white/65' : 'text-[#9ca3af]'}`}>{plan.description}</p>
                    )}
                    <div className={`text-[42px] font-black leading-none mb-6 ${featured ? 'text-white' : 'text-[#1e40af]'}`}>
                      ₪{plan.amount.toLocaleString()}
                    </div>
                    <Link to="/login"
                      className={`btn w-full justify-center ${featured ? 'bg-white text-[#1e40af] hover:bg-[#F8FAFF]' : 'btn-blue'}`}>
                      בחר מסלול
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-[#9ca3af] py-10">מסלולים יתעדכנו בקרוב</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black text-[#111827] mb-4">
            לא בטוחים איזה שירות מתאים לכם?
          </h2>
          <p className="section-lead mb-8">
            התקשרו לייעוץ ראשוני חינמי ואנחנו נעזור לכם למצוא את הדרך הנכונה.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="tel:0527090457" className="btn btn-blue"><Phone size={15} />052-7090457</a>
            <Link to="/contact" className="btn btn-outline">
              השאירו פרטים <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
