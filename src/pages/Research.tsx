import { Link } from 'react-router-dom'
import { Users, TrendingUp, ArrowLeft, FileText, BarChart2 } from 'lucide-react'

const papers = [
  {
    title: 'אלימות על בסיס מגדר — שני המינים',
    year: '2023',
    participants: '847 משתתפים',
    abstract:
      'מחקר כמותי-איכותני שבחן את שיעורי האלימות הביתית כלפי גברים בישראל, תוך השוואה עם נתונים קיימים על נשים. הממצאים מעלים תמונה מורכבת שדורשת שינוי מדיני ותודעתי.',
    color: '#1e40af',
    bg: '#dbeafe',
    icon: BarChart2,
  },
  {
    title: 'השלכות גירושין על ילדים ואבות',
    year: '2022',
    participants: '1,200 משפחות',
    abstract:
      'מחקר אורך שעקב אחר משפחות לאחר גירושין. נמצא כי מעורבות פעילה של האב משפיעה מהותית על רווחת הילדים. נבחנו גם השלכות על הבריאות הנפשית של האב הגרוש.',
    color: '#059669',
    bg: '#d1fae5',
    icon: Users,
  },
  {
    title: 'יעילות קבוצות תמיכה לגברים',
    year: '2024',
    participants: '450 משתתפים',
    abstract:
      'מחקר התערבות שבחן את השפעת קבוצות התמיכה של הארגון על מדדי בריאות נפשית, תחושת שייכות ותפקוד הורי. 83% מהמשתתפים דיווחו על שיפור משמעותי.',
    color: '#7c3aed',
    bg: '#ede9fe',
    icon: TrendingUp,
  },
]

const stats = [
  { number: '1 מתוך 3', label: 'קורבנות אלימות ביתית בישראל הוא גבר', color: '#dc2626', bg: '#fee2e2' },
  { number: '70%', label: 'מהאבות הגרושים מדווחים על ניכור הורי', color: '#1e40af', bg: '#dbeafe' },
  { number: '60%', label: 'מהגברים נפגעי אלימות לא פונים לעזרה', color: '#d97706', bg: '#fef3c7' },
  { number: '85%', label: 'מהמטופלים שלנו חזרו לתפקוד הורי מלא', color: '#059669', bg: '#d1fae5' },
]

export default function Research() {
  return (
    <div dir="rtl" className="bg-white">

      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-20">
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/50 -top-20 -right-20" />
        <div className="blob w-[300px] h-[300px] bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">ידע ומחקר</p>
            <h1 className="section-heading mb-5">מחקרים ומידע</h1>
            <p className="section-lead">
              פעולתנו מבוססת על ראיות — אנו משקיעים במחקר מדעי כדי להבין טוב יותר את צרכי הגברים ולשפר את שירותינו.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-eyebrow mb-3">הגישה שלנו</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827] mb-6 leading-tight">
                מחקר כבסיס<br />
                <span className="text-[#1e40af]">לעשייה מקצועית</span>
              </h2>
              <div className="space-y-4 text-[#6b7280] text-[15px] leading-relaxed">
                <p>
                  לצדכם שמה דגש על הבנה מחקרית של תופעת האלימות הביתית כלפי גברים — תחום שמקבל מעט מאוד תשומת לב מחקרית בישראל ובעולם.
                </p>
                <p>
                  אנו מפרסמים ממצאים, שותפים לכנסים מקצועיים, ומשתפים פעולה עם אוניברסיטאות כדי לקדם מדיניות מבוססת ראיות.
                </p>
                <p>
                  הידע שנצבר מחזיר אל השדה — לשיפור הקבוצות, ההדרכות ושיטות הטיפול שאנו מציעים.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '12', label: 'מחקרים פורסמו' },
                { num: '3', label: 'שיתופי פעולה אקדמיים' },
                { num: '2024', label: 'עדכון אחרון' },
                { num: '5,000+', label: 'משתתפים במחקרים' },
              ].map((s, i) => (
                <div key={i} className="bg-[#F8FAFF] rounded-2xl p-6 text-center border border-[#dbeafe]">
                  <div className="text-[2rem] font-black text-[#1e40af] mb-1">{s.num}</div>
                  <div className="text-[12px] text-[#6b7280] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">מחקרים נבחרים</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827]">
              פרסומים עדכניים
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {papers.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="card p-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: p.bg }}
                    >
                      <Icon size={20} style={{ color: p.color }} />
                    </div>
                    <div className="flex gap-2">
                      <span className="pill pill-blue text-[12px]">{p.year}</span>
                      <span
                        className="pill text-[12px]"
                        style={{ background: p.bg, color: p.color }}
                      >
                        {p.participants}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-[1.05rem] font-black text-[#111827] leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-[14px] text-[#6b7280] leading-relaxed flex-1">{p.abstract}</p>

                  <div>
                    <Link to="/contact" className="btn btn-outline btn-sm">
                      <FileText size={14} />
                      קרא עוד
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">עובדות ונתונים</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827]">
              מה המחקרים מראים
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="card p-7 text-center"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                <div className="text-[2.2rem] font-black mb-3" style={{ color: s.color }}>
                  {s.number}
                </div>
                <p className="text-[14px] text-[#1f2937] font-medium leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1e40af] relative overflow-hidden">
        <div className="blob w-96 h-96 bg-[#2563eb]/60 -top-20 -right-20" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="section-heading-white mb-4">יש לכם שאלות?</h2>
          <p className="text-white/80 section-lead mb-8">
            צרו קשר עם צוות המחקר שלנו — נשמח לשתף ולסייע.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-ghost">
              צרו קשר
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
