import { Link } from 'react-router-dom'
import { Users, Heart, Shield, Stethoscope, MapPin, Clock, Calendar, ArrowLeft } from 'lucide-react'

const groups = [
  {
    icon: Users,
    color: '#1e40af',
    bg: '#dbeafe',
    title: 'קבוצת גירושין',
    description:
      'קבוצת תמיכה פתוחה לאבות גרושים בכל שלבי ההליך. המפגשים מלווים את המשתתפים דרך התהליך המשפטי, הרגשי והמשפחתי — ביחד חזקים יותר.',
    frequency: 'מפגש שבועי',
    cities: ['תל אביב', 'ירושלים', 'חיפה', 'ב״ב', 'ראשל״צ'],
    badge: 'pill-blue',
  },
  {
    icon: Shield,
    color: '#dc2626',
    bg: '#fee2e2',
    title: 'אלימות במשפחה',
    description:
      'קבוצה ייעודית לגברים שחוו אלימות פיזית, רגשית או מילולית מצד בת הזוג. מרחב בטוח להכרה, עיבוד וריפוי.',
    frequency: 'מפגש דו-שבועי',
    cities: ['תל אביב', 'ירושלים', 'חיפה', 'פ״ת', 'נתניה'],
    badge: 'bg-red-100 text-red-700',
  },
  {
    icon: Heart,
    color: '#7c3aed',
    bg: '#ede9fe',
    title: 'אלימות מינית',
    description:
      'קבוצה טיפולית לגברים נפגעי אלימות מינית, בליווי מטפל מוסמך. נושאים שקשה לדון בהם לבד — יטופלו בזהירות ובכבוד.',
    frequency: 'מפגש שבועי',
    cities: ['תל אביב', 'ירושלים', 'חיפה'],
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    icon: Stethoscope,
    color: '#059669',
    bg: '#d1fae5',
    title: 'יחידה טיפולית',
    description:
      'יחידה אינטנסיבית למקרים מורכבים הדורשים ליווי נפשי עמוק. מותאמת אישית, בהנחיית פסיכולוגים קליניים מנוסים.',
    frequency: 'אינטנסיבי — לפי צורך',
    cities: ['תל אביב', 'ירושלים', 'חיפה', 'ב״ב'],
    badge: 'pill-green',
  },
]

const cities = [
  'תל אביב', 'ירושלים', 'חיפה', 'בני ברק', 'פתח תקווה',
  'נתניה', 'אשדוד', 'ראשון לציון', 'רחובות', 'אשקלון', 'באר שבע',
]

export default function Groups() {
  return (
    <div dir="rtl" className="bg-white">

      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-20">
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/50 -top-20 -right-20" />
        <div className="blob w-[300px] h-[300px] bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">קבוצות תמיכה</p>
            <h1 className="section-heading mb-5">קבוצות ומפגשים</h1>
            <p className="section-lead">
              מרחבים בטוחים ומקצועיים שבהם גברים מוצאים הקשבה, הבנה ותמיכה הדדית — בליווי מטפלים מנוסים.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Group Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">סוגי קבוצות</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#111827] mb-4">
              בחרו את הקבוצה המתאימה לכם
            </h2>
            <p className="section-lead max-w-2xl mx-auto">
              כל קבוצה מותאמת לאוכלוסייה ספציפית ומנוהלת על ידי מטפלים מוסמכים עם ניסיון רב שנים.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((g, i) => {
              const Icon = g.icon
              return (
                <div key={i} className="card p-8 flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: g.bg }}
                    >
                      <Icon size={24} style={{ color: g.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[1.2rem] font-black text-[#111827] mb-1">{g.title}</h3>
                      <div className="flex items-center gap-1.5 text-[13px] text-[#6b7280]">
                        <Calendar size={13} />
                        <span>{g.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#1f2937] leading-relaxed">{g.description}</p>

                  <div className="flex flex-wrap gap-2 items-center">
                    <MapPin size={14} className="text-[#6b7280]" />
                    {g.cities.map(city => (
                      <span
                        key={city}
                        className="text-[12px] font-medium text-[#1e40af] bg-[#dbeafe] px-2.5 py-1 rounded-full"
                      >
                        {city}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-2">
                    <Link to="/contact" className="btn btn-blue btn-sm">
                      הצטרף לקבוצה
                      <ArrowLeft size={14} className="rotate-180" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">תהליך הצטרפות</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827]">
              איך מצטרפים לקבוצה?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'פנייה ראשונית', desc: 'צרו קשר טלפוני או דרך האתר — ייעוץ ראשוני ללא עלות.' },
              { step: '02', title: 'שיחת הערכה', desc: 'שיחה קצרה עם מנחה הקבוצה כדי למצוא את ההתאמה הטובה ביותר עבורכם.' },
              { step: '03', title: 'הצטרפות למפגש', desc: 'מגיעים למפגש הראשון, מכירים את הקבוצה, ומתחילים את המסע.' },
            ].map((s, i) => (
              <div key={i} className="card p-7 text-center">
                <div className="text-[2.5rem] font-black text-[#dbeafe] mb-3">{s.step}</div>
                <h3 className="text-[1rem] font-bold text-[#111827] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#6b7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 bg-[#1e40af] relative overflow-hidden">
        <div className="blob w-96 h-96 bg-[#2563eb]/60 -top-20 -right-20" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="section-heading-white mb-3">פעילים בכל הארץ</h2>
          <p className="text-white/70 text-[16px] mb-10">
            קבוצות פועלות ב-{cities.length} ערים ברחבי ישראל
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {cities.map(city => (
              <div
                key={city}
                className="flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-4 py-2.5 rounded-full text-[14px] font-medium backdrop-blur-sm"
              >
                <MapPin size={12} className="text-white/70" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black text-[#111827] mb-4">
            מוכנים להצטרף?
          </h2>
          <p className="section-lead mb-8">
            פנו אלינו היום ונמצא יחד את הקבוצה המתאימה לכם — ללא עלות וללא התחייבות.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-blue">
              צרו קשר עכשיו
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
            <Link to="/services" className="btn btn-outline">כל השירותים</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
