import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'
import { servicesApi } from '../api/services'
import Loading from '../components/ui/Loading'

const staticServices = [
  {
    title: 'ייעוץ אישי',
    desc: 'פגישות אישיות עם עובד סוציאלי מוסמך. אנחנו מקשיבים, מבינים ומסייעים לך לנווט את תהליך הגירושין בצורה הטובה ביותר.',
    price: 'ייעוץ ראשוני חינם',
    features: ['פגישות אישיות', 'תמיכה רגשית', 'כלים מעשיים', 'מעקב שוטף'],
    color: 'bg-blue-50',
    accent: 'text-[#0071e3]',
  },
  {
    title: 'ייעוץ משפטי',
    desc: 'ייעוץ משפטי ראשוני חינמי בנושאי גירושין, משמורת, ניכור הורי ומשמורת פיזית ומשפטית על הילדים.',
    price: 'פגישה ראשונה ללא עלות',
    features: ['ייעוץ ראשוני חינם', 'נושאי משמורת', 'ניכור הורי', 'זכויות האב'],
    color: 'bg-green-50',
    accent: 'text-green-600',
  },
  {
    title: 'קבוצות תמיכה',
    desc: 'קבוצות תמיכה שבועיות לאבות גרושים — מרחב בטוח, מכבד ומחבק לשיתוף, לצמיחה ולחיזוק.',
    price: 'בבדיקה עלות',
    features: ['מפגשים שבועיים', 'קבוצות קטנות', 'מנוחל מקצועי', 'אנונימי ובטוח'],
    color: 'bg-purple-50',
    accent: 'text-purple-600',
  },
  {
    title: 'טיפול פסיכולוגי',
    desc: 'טיפול פסיכולוגי פרטני לגברים המתמודדים עם תוצאות נפשיות של גירושין, אלימות וסכסוכי משמורת.',
    price: 'לפי הסכם',
    features: ['טיפול CBT', 'עיבוד טראומה', 'בניית עמידות', 'כלי הורות'],
    color: 'bg-orange-50',
    accent: 'text-orange-600',
  },
  {
    title: 'סדנאות',
    desc: 'סדנאות העצמה, הרצאות מקצועיות ומפגשי הדרכה להורות מיטיבה ולהתמודדות עם גירושין.',
    price: 'לפי תוכנית',
    features: ['הורות משותפת', 'כלים רגשיים', 'מומחים מוזמנים', 'מפגשים מעשיים'],
    color: 'bg-yellow-50',
    accent: 'text-yellow-600',
  },
  {
    title: 'ווביינרים מקוונים',
    desc: 'מפגשים מקוונים עם מומחים בנושאי גירושין, ילדים, בריאות נפשית ומשפט — מכל מקום בארץ.',
    price: 'חינם / בתשלום סמלי',
    features: ['זמין מכל מקום', 'מומחים מובילים', 'שאלות ותשובות', 'תיעוד מפגשים'],
    color: 'bg-sky-50',
    accent: 'text-sky-600',
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
      <section className="bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title mb-4">השירותים שלנו</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            מגוון שירותים מקצועיים ואנושיים לתמיכה בכל שלב של תהליך הגירושין
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticServices.map((s, i) => (
              <div key={i} className={`${s.color} rounded-3xl p-7 card-hover`}>
                <h3 className="text-[20px] font-bold text-[#1d1d1f] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed mb-4">{s.desc}</p>
                <div className={`text-[13px] font-semibold ${s.accent} mb-5`}>{s.price}</div>
                <ul className="space-y-2">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#1d1d1f]">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${s.color === 'bg-blue-50' ? 'bg-[#0071e3]' : s.color === 'bg-green-50' ? 'bg-green-500' : s.color === 'bg-purple-50' ? 'bg-purple-500' : s.color === 'bg-orange-50' ? 'bg-orange-500' : s.color === 'bg-yellow-50' ? 'bg-yellow-500' : 'bg-sky-500'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">מסלולי טיפול</h2>
            <p className="section-subtitle">בחרו את המסלול המתאים לצרכיכם</p>
          </div>

          {plansLoading ? (
            <Loading />
          ) : plans && plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-7 card-hover ${
                    i === 1 ? 'bg-[#0071e3] text-white' : 'bg-white'
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-3 right-6 bg-white text-[#0071e3] text-[12px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      הכי פופולרי
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
                  {plan.description && (
                    <p className={`text-[13px] mb-5 leading-relaxed ${i === 1 ? 'text-white/70' : 'text-[#86868b]'}`}>
                      {plan.description}
                    </p>
                  )}
                  <div className="text-[40px] font-bold mb-6">
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
          ) : (
            <div className="text-center py-12 text-[#86868b]">
              <p>מסלולי טיפול יתעדכנו בקרוב</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#1d1d1f] mb-4">
            לא בטוחים איזה שירות מתאים לכם?
          </h2>
          <p className="text-[#86868b] text-[16px] mb-8">
            התקשרו אלינו לייעוץ ראשוני חינמי ואנחנו נעזור לכם למצוא את הדרך הנכונה.
          </p>
          <div className="flex gap-3 justify-center">
            <a href="tel:0527090457" className="apple-btn apple-btn-primary">
              <Phone size={15} />
              052-7090457
            </a>
            <Link to="/contact" className="apple-btn apple-btn-secondary">
              השאירו פרטים
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
