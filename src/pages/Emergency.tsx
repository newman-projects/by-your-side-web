import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Clock, AlertTriangle, Heart, Users, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'

function useHotlineStatus() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function check() {
      const now = new Date()
      // Sunday = 0, Monday = 1, ..., Thursday = 4, Friday = 5, Saturday = 6
      const day = now.getDay()
      const hour = now.getHours()
      const minute = now.getMinutes()
      const totalMinutes = hour * 60 + minute

      // Sunday–Thursday (0–4), 20:00–24:00
      const isWeekday = day >= 0 && day <= 4
      // 20:00 = 1200 min, 00:00 = 0 min (midnight boundary — treat as open until 23:59)
      const inHours = totalMinutes >= 20 * 60 // 20:00 onwards till midnight

      setIsOpen(isWeekday && inHours)
    }

    check()
    const timer = setInterval(check, 60_000)
    return () => clearInterval(timer)
  }, [])

  return isOpen
}

const hotlineServices = [
  {
    icon: Heart,
    color: '#dc2626',
    bg: '#fee2e2',
    title: 'תמיכה רגשית',
    desc: 'שיחה עם מאזין מקצועי — ללא שיפוטיות, ללא לחץ. פשוט מישהו שמקשיב.',
  },
  {
    icon: AlertTriangle,
    color: '#d97706',
    bg: '#fef3c7',
    title: 'התערבות במשבר',
    desc: 'כלים מיידיים להתמודדות עם רגעי משבר — יחד נצלח גם את הרגע הזה.',
  },
  {
    icon: BookOpen,
    color: '#1e40af',
    bg: '#dbeafe',
    title: 'הפניה למשאבים',
    desc: 'חיבור לשירותים נוספים — פסיכולוגים, עורכי דין, קבוצות תמיכה וגורמי רווחה.',
  },
]

const emergencySteps = [
  'נשמו עמוק — אתם לא לבד',
  'התקשרו למוקד: 052-709-0457',
  'אם אתם בסכנה מיידית — חייגו 100 (משטרה) או 101 (מד"א)',
  'הרחיקו את עצמכם ממצב מסוכן אם אפשר',
  'שמרו על ילדיכם — ודאו שהם בטוחים',
  'לאחר הרגע החריף — פנו לייעוץ מקצועי בהקדם',
]

export default function Emergency() {
  const isOpen = useHotlineStatus()

  return (
    <div dir="rtl" className="bg-white">

      {/* Hero — urgent red styling */}
      <section className="relative bg-[#1e1e1e] overflow-hidden pt-28 pb-20">
        <div className="blob w-[600px] h-[600px] bg-red-900/30 -top-20 -right-20" />
        <div className="blob w-[400px] h-[400px] bg-red-800/20 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[0.8125rem] font-bold tracking-widest uppercase text-red-400 mb-4">
              עזרה מיידית
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-black leading-tight text-white mb-5">
              מוקד החירום
            </h1>
            <p className="text-white/70 text-[clamp(1.0625rem,2vw,1.25rem)] leading-relaxed mb-8">
              לא חייבים לעבור את זה לבד. צוות המוקד שלנו פה בשבילכם —
              קשיבים, מקצועיים ולא שופטים.
            </p>

            {/* Phone number — large & clickable */}
            <a
              href="tel:0527090457"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center anim-pulse">
                <Phone size={28} className="text-white" />
              </div>
              <div>
                <div className="text-[clamp(2rem,6vw,3.5rem)] font-black text-white tracking-tight leading-none group-hover:text-red-300 transition-colors">
                  052-709-0457
                </div>
                <div className="text-[13px] text-white/50 mt-1">לחצו להתקשרות</div>
              </div>
            </a>

            {/* Hours & open/closed indicator */}
            <div className="flex items-center gap-4 mt-8 flex-wrap">
              <div className="flex items-center gap-2 text-white/70 text-[14px]">
                <Clock size={15} />
                <span>ימים א׳–ה׳, 20:00–00:00</span>
              </div>
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-bold ${
                  isOpen
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}
                  style={isOpen ? { boxShadow: '0 0 6px #4ade80' } : {}}
                />
                {isOpen ? 'פתוח עכשיו' : 'סגור כרגע'}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-10 bg-white border-b border-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="text-[1.1rem] font-black text-[#111827]">
              מעדיפים וואטסאפ?
            </h2>
            <p className="text-[14px] text-[#6b7280] mt-1">
              שלחו הודעה ואחד מהמתנדבים שלנו יחזור אליכם בהקדם.
            </p>
          </div>
          <a
            href="https://wa.me/972527090457"
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex-shrink-0"
            style={{
              background: '#25D366',
              color: '#fff',
              boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
            }}
          >
            <MessageCircle size={18} />
            פנה בוואטסאפ
          </a>
        </div>
      </section>

      {/* What hotline provides */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">שירותי המוקד</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827]">
              מה תקבלו בשיחה
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {hotlineServices.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="card p-7 text-center flex flex-col items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <Icon size={28} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-[1.1rem] font-black text-[#111827]">{s.title}</h3>
                  <p className="text-[14px] text-[#6b7280] leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emergency steps */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-eyebrow mb-3">מה לעשות</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827] mb-6 leading-tight">
                מה לעשות<br />
                <span className="text-[#dc2626]">במצב חירום?</span>
              </h2>
              <ul className="space-y-4">
                {emergencySteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#fee2e2] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[12px] font-black text-[#dc2626]">{i + 1}</span>
                    </div>
                    <span className="text-[15px] text-[#1f2937] font-medium leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <h3 className="text-[1.1rem] font-black text-[#111827]">סכנה מיידית?</h3>
              </div>
              <p className="text-[14px] text-[#6b7280] mb-6 leading-relaxed">
                אם אתם או ילדיכם בסכנה מיידית — אל תחכו. פנו מיד לגורמי החירום:
              </p>
              <div className="space-y-3">
                {[
                  { num: '100', label: 'משטרת ישראל', color: '#1e40af' },
                  { num: '101', label: 'מד״א — מגן דוד אדום', color: '#dc2626' },
                  { num: '102', label: 'כיבוי אש', color: '#d97706' },
                ].map((n, i) => (
                  <a
                    key={i}
                    href={`tel:${n.num}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border transition-all hover:shadow-md"
                    style={{ borderColor: `${n.color}30`, background: `${n.color}08` }}
                  >
                    <span className="text-[14px] font-medium text-[#1f2937]">{n.label}</span>
                    <span className="text-[1.3rem] font-black" style={{ color: n.color }}>{n.num}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other contact options */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-[#dbeafe] flex items-center justify-center">
              <Users size={24} className="text-[#1e40af]" />
            </div>
          </div>
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black text-[#111827] mb-4">
            אפשרויות קשר נוספות
          </h2>
          <p className="section-lead mb-8">
            המוקד אינו פעיל? תוכלו לפנות אלינו גם דרך טופס האינטרנט — נחזור אליכם בהקדם.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
            <Link to="/contact" className="btn btn-blue">
              טופס פנייה
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
            <a
              href="https://wa.me/972527090457"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#25D366',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
              }}
            >
              <MessageCircle size={16} />
              וואטסאפ
            </a>
            <Link to="/services" className="btn btn-outline">כל השירותים</Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[13px] text-[#6b7280]">
            {[
              'סודיות מוחלטת',
              'ללא עלות',
              'ללא שיפוטיות',
              'אנשי מקצוע מוסמכים',
            ].map((tag, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-[#059669]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
