import { Link } from 'react-router-dom'
import { Scale, Users, DollarSign, Heart, Shield, BookOpen, Download, ArrowLeft } from 'lucide-react'

const guides = [
  {
    icon: Scale,
    color: '#1e40af',
    bg: '#dbeafe',
    accentColor: '#1e40af',
    title: 'מדריך גירושין שלב אחר שלב',
    description:
      'מדריך מקיף המלווה אתכם לאורך כל שלבי הגירושין — מהגשת הבקשה, דרך הגישור, ועד לסיום ההליך המשפטי.',
    pages: '48 עמודים',
    updated: 'עודכן 2024',
  },
  {
    icon: Users,
    color: '#059669',
    bg: '#d1fae5',
    accentColor: '#059669',
    title: 'זכויות האב במשמורת',
    description:
      'סקירה מעמיקה של זכויות האב במשמורת ובחינוך הילדים — ביקורים, החלטות רפואיות, חינוך וכל מה שחשוב לדעת.',
    pages: '36 עמודים',
    updated: 'עודכן 2024',
  },
  {
    icon: DollarSign,
    color: '#d97706',
    bg: '#fef3c7',
    accentColor: '#d97706',
    title: 'כלכלה ומזונות לאב הגרוש',
    description:
      'מדריך פיננסי מעשי: חישוב מזונות, חלוקת רכוש, זכאויות מס, וניהול תקציב משפחתי לאחר הגירושין.',
    pages: '42 עמודים',
    updated: 'עודכן 2023',
  },
  {
    icon: Heart,
    color: '#7c3aed',
    bg: '#ede9fe',
    accentColor: '#7c3aed',
    title: 'התמודדות עם ניכור הורי',
    description:
      'הכרת הסימנים, כלים פרקטיים לתיעוד, פנייה לערכאות משפטיות, ושמירה על הקשר עם הילדים.',
    pages: '54 עמודים',
    updated: 'עודכן 2024',
  },
  {
    icon: Shield,
    color: '#0891b2',
    bg: '#cffafe',
    accentColor: '#0891b2',
    title: 'פנייה לרשויות — מה לדעת',
    description:
      'מדריך לפנייה לשירותים הסוציאליים, המשטרה, בתי המשפט ומוסדות אחרים — איך לפעול נכון ולשמור על זכויותיכם.',
    pages: '30 עמודים',
    updated: 'עודכן 2024',
  },
  {
    icon: BookOpen,
    color: '#db2777',
    bg: '#fce7f3',
    accentColor: '#db2777',
    title: 'שמירה על בריאות נפשית בגירושין',
    description:
      'כלים פסיכולוגיים מעשיים לניהול מתח, שיפור דימוי עצמי, ובניית חיים חדשים ומשמעותיים לאחר הגירושין.',
    pages: '38 עמודים',
    updated: 'עודכן 2023',
  },
]

export default function Guides() {
  return (
    <div dir="rtl" className="bg-white">

      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-20">
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/50 -top-20 -right-20" />
        <div className="blob w-[300px] h-[300px] bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">ספרייה דיגיטלית</p>
            <h1 className="section-heading mb-5">מדריכים</h1>
            <p className="section-lead">
              מדריכים מעשיים ושלב-אחר-שלב שנכתבו על ידי עורכי דין, פסיכולוגים ועובדים סוציאליים — בשבילכם.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">מדריכים זמינים</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#111827] mb-4">
              כל מה שצריך לדעת — במקום אחד
            </h2>
            <p className="section-lead max-w-2xl mx-auto">
              {guides.length} מדריכים מקצועיים, זמינים להורדה ללא עלות לכל פונה לארגון.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {guides.map((g, i) => {
              const Icon = g.icon
              return (
                <div
                  key={i}
                  className="card p-7 flex flex-col gap-4"
                  style={{ borderTop: `4px solid ${g.accentColor}` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: g.bg }}
                    >
                      <Icon size={22} style={{ color: g.color }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: g.bg, color: g.color }}
                      >
                        {g.pages}
                      </span>
                      <span className="text-[11px] text-[#9ca3af]">{g.updated}</span>
                    </div>
                  </div>

                  <h3 className="text-[1.05rem] font-black text-[#111827] leading-snug">
                    {g.title}
                  </h3>

                  <p className="text-[14px] text-[#6b7280] leading-relaxed flex-1">
                    {g.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="btn btn-sm inline-flex items-center gap-2 font-semibold transition-all"
                      style={{
                        background: g.bg,
                        color: g.color,
                        border: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      <Download size={14} />
                      הורד מדריך
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-14 bg-[#F8FAFF]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="card p-8 flex flex-col sm:flex-row gap-6 items-start card-accent">
            <div className="w-12 h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center flex-shrink-0">
              <BookOpen size={22} className="text-[#1e40af]" />
            </div>
            <div>
              <h3 className="text-[1.1rem] font-black text-[#111827] mb-2">
                המדריכים מיועדים לכם בלבד
              </h3>
              <p className="text-[15px] text-[#6b7280] leading-relaxed">
                כל המדריכים נכתבו על ידי צוות מקצועי של לצדכם ואינם מחליפים ייעוץ משפטי פרטני.
                לשאלות ספציפיות — פנו אלינו ישירות וצוות המומחים שלנו ישמח לעזור.
              </p>
              <div className="mt-5">
                <Link to="/contact" className="btn btn-blue btn-sm">
                  פנו לייעוץ אישי
                  <ArrowLeft size={14} className="rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black text-[#111827] mb-4">
            לא מצאתם מה שחיפשתם?
          </h2>
          <p className="section-lead mb-8">
            צוות לצדכם זמין לענות על כל שאלה — פנו אלינו ונסייע.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-blue">
              צרו קשר
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
            <Link to="/services" className="btn btn-outline">כל השירותים</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
