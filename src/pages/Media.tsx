import { Link } from 'react-router-dom'
import { Tv, Newspaper, ExternalLink, ArrowLeft, Play, Users } from 'lucide-react'

const pressItems = [
  {
    outlet: 'ידיעות אחרונות',
    outletShort: 'ynet',
    type: 'עיתון',
    color: '#dc2626',
    bg: '#fee2e2',
    headline: 'גברים גם הם קורבנות אלימות — ישראל מתעוררת',
    date: 'מרץ 2024',
    excerpt:
      'כתבה מעמיקה על עלייה בפניות גברים לעמותת לצדכם ועל השינוי התודעתי שהארגון מוביל בחברה הישראלית.',
  },
  {
    outlet: 'ערוץ 13',
    outletShort: 'Ch.13',
    type: 'טלוויזיה',
    color: '#1d4ed8',
    bg: '#dbeafe',
    headline: 'ראיון עם המנכ״ל — גברים שנפגעו בשתיקה',
    date: 'ינואר 2024',
    excerpt:
      'ראיון ישיר ומרגש עם מנכ״ל הארגון על שנות פעילות, האתגרים ומה משמעותו של מרחב בטוח לגברים בישראל.',
  },
  {
    outlet: 'מאקו',
    outletShort: 'mako',
    type: 'אונליין',
    color: '#059669',
    bg: '#d1fae5',
    headline: 'תופעת ניכור הורי — השקט שמחריש',
    date: 'ספטמבר 2023',
    excerpt:
      'סקירה על ניכור הורי בישראל, עם עדויות מאבות שלצדכם סייעה להם לחזור לילדיהם לאחר שנות מאבק.',
  },
  {
    outlet: 'הארץ',
    outletShort: 'haaretz',
    type: 'עיתון',
    color: '#374151',
    bg: '#f3f4f6',
    headline: 'המרכז שעוזר לאבות גרושים למצוא את דרכם',
    date: 'יוני 2023',
    excerpt:
      'פרופיל מקיף על ארגון לצדכם — מי הם, מה הם עושים, ולמה המודל שלהם ייחודי בנוף השירותים הסוציאליים בישראל.',
  },
  {
    outlet: 'כאן 11',
    outletShort: 'כאן',
    type: 'רדיו/טלוויזיה',
    color: '#7c3aed',
    bg: '#ede9fe',
    headline: 'כתבה על שירותי הארגון ופעילותו ברחבי הארץ',
    date: 'פברואר 2023',
    excerpt:
      'סיקור של שירותי הסיוע שמציעה לצדכם ב-11 ערים, עם דגש על הנגישות למגזרים שונים בחברה הישראלית.',
  },
  {
    outlet: 'גלובס',
    outletShort: 'globes',
    type: 'כלכלה',
    color: '#d97706',
    bg: '#fef3c7',
    headline: 'עמותות חברתיות שמשנות חיים — לצדכם ברשימה',
    date: 'נובמבר 2022',
    excerpt:
      'לצדכם נכללה ברשימת 10 עמותות חברתיות מובילות בישראל, עם דגש על שקיפות, יעילות ורוחב הפעולה.',
  },
]

const socialLinks = [
  {
    icon: Play,
    name: 'YouTube',
    desc: 'סרטונים, ראיונות ומעגלי שיח',
    color: '#dc2626',
    bg: '#fee2e2',
    href: 'https://www.youtube.com',
    cta: 'עקבו בYouTube',
  },
  {
    icon: Users,
    name: 'Facebook',
    desc: 'עדכונים, מאמרים ופעילות הארגון',
    color: '#1d4ed8',
    bg: '#dbeafe',
    href: 'https://www.facebook.com',
    cta: 'עקבו בFacebook',
  },
  {
    // TikTok doesn't exist in lucide-react, using Tv as stand-in
    icon: Tv,
    name: 'TikTok',
    desc: 'תכנים קצרים ומעוררי מחשבה',
    color: '#111827',
    bg: '#f3f4f6',
    href: 'https://www.tiktok.com',
    cta: 'עקבו בTikTok',
  },
]

export default function Media() {
  return (
    <div dir="rtl" className="bg-white">

      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-20">
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/50 -top-20 -right-20" />
        <div className="blob w-[300px] h-[300px] bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">כיסוי תקשורתי</p>
            <h1 className="section-heading mb-5">בתקשורת</h1>
            <p className="section-lead">
              לצדכם בחדשות — כיסוי עיתונאי ורדיו-טלוויזיוני על עבודתנו, ממצאינו ואנשי הצוות שלנו.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Press Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">פרסומים ותקשורת</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#111827] mb-4">
              כתבות ודיווחים
            </h2>
            <p className="section-lead max-w-2xl mx-auto">
              תקשורת ישראלית מובילה מדווחת על עשייתנו ומקדמת מודעות לנושאים שבלב פעילותנו.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pressItems.map((item, i) => (
              <div key={i} className="card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.bg }}
                    >
                      {item.type === 'טלוויזיה' || item.type === 'רדיו/טלוויזיה'
                        ? <Tv size={16} style={{ color: item.color }} />
                        : <Newspaper size={16} style={{ color: item.color }} />
                      }
                    </div>
                    <div>
                      <span
                        className="text-[13px] font-black"
                        style={{ color: item.color }}
                      >
                        {item.outlet}
                      </span>
                      <div className="text-[11px] text-[#9ca3af]">{item.type}</div>
                    </div>
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: item.bg, color: item.color }}
                  >
                    {item.date}
                  </span>
                </div>

                <h3 className="text-[1rem] font-black text-[#111827] leading-snug">
                  {item.headline}
                </h3>

                <p className="text-[13px] text-[#6b7280] leading-relaxed flex-1">
                  {item.excerpt}
                </p>

                <div>
                  <a
                    href="#"
                    className="btn btn-outline btn-sm inline-flex items-center gap-2"
                  >
                    <ExternalLink size={13} />
                    לכתבה המלאה
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">עקבו אחרינו</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827]">
              ברשתות החברתיות
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 max-w-4xl mx-auto">
            {socialLinks.map((s, i) => {
              const Icon = s.icon
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-7 text-center flex flex-col items-center gap-4 no-underline"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <Icon size={28} style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="text-[1.1rem] font-black text-[#111827] mb-1">{s.name}</h3>
                    <p className="text-[13px] text-[#6b7280]">{s.desc}</p>
                  </div>
                  <span
                    className="btn btn-sm mt-auto"
                    style={{ background: s.bg, color: s.color, boxShadow: 'none' }}
                  >
                    {s.cta}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black text-[#111827] mb-4">
            עיתונאים ואנשי תקשורת
          </h2>
          <p className="section-lead mb-8">
            לראיונות, ציטוטים ומידע עבור כתבות — נשמח לשתף פעולה. פנו אלינו ישירות.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-blue">
              יצירת קשר לתקשורת
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
