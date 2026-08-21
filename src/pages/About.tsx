import { Link } from 'react-router-dom'
import { Heart, Users, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react'

const locations = [
  'בני ברק', 'רמת גן', 'תל אביב', 'טבריה',
  'ראשון לציון', 'ירושלים', 'נהר', 'פרדס חנה',
  'מודיעין', 'גוש עציון', 'כפר מלא',
]

const whoWeHelp = [
  'אבות גרושים בכל שלבי ההליך',
  'קורבנות ניכור הורי',
  'גברים נפגעי אלימות פיזית ורגשית',
  'מתמודדים עם האשמות שווא',
  'חיילי מילואים ומשפחותיהם',
  'גברים בהליכי גירושין מורכבים',
]

export default function About() {
  return (
    <div dir="rtl" className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-20">
        <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/50 -top-20 -right-20" />
        <div className="blob w-[300px] h-[300px] bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">מי אנחנו</p>
            <h1 className="section-heading mb-5">אודות לצדכם</h1>
            <p className="section-lead">
              מרכז לתמיכה מקצועית, סיוע נפשי, טיפול ושיקום גברים נפגעי אלימות ואבות גרושים בישראל — כבר מעל עשור.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-eyebrow mb-3">המשימה שלנו</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black text-[#111827] mb-6 leading-tight">
                כל אבא ראוי<br />
                <span className="text-[#1e40af]">לתמיכה ולהזדמנות</span>
              </h2>
              <div className="space-y-4 text-[#6b7280] text-[15px] leading-relaxed">
                <p>
                  לצדכם הוקמה מתוך הכרה כי אבות רבים בישראל מוצאים את עצמם לבד מול מערכת מסובכת של גירושין, ניכור הורי, משמורת וסוגיות משפטיות — ללא תמיכה מקצועית ומותאמת.
                </p>
                <p>
                  אנחנו מספקים מרחב בטוח ומכבד בו גברים יכולים לקבל עזרה, לשתף, ולחזור לתפקד כאבות טובים ואנשים שלמים.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2,000+', label: 'גברים טיפלנו' },
                { num: '10+', label: 'שנות פעילות' },
                { num: '11', label: 'סניפים בארץ' },
                { num: '50+', label: 'מטפלים ומתנדבים' },
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

      {/* Who we help */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-eyebrow mb-3">קהל היעד</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-[#111827] mb-6 leading-tight">
                למי אנחנו פונים
              </h2>
              <ul className="space-y-3">
                {whoWeHelp.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#1e40af] flex-shrink-0" />
                    <span className="text-[15px] text-[#1f2937] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Heart, color: '#f97316', bg: '#fff7ed', title: 'אמפתיה', desc: 'כל גבר ראוי לשמיעה, כבוד וטיפול מקצועי' },
                { icon: Users, color: '#1e40af', bg: '#dbeafe', title: 'קהילה', desc: 'יחד חזקים יותר — תמיכה הדדית ואמיתית' },
                { icon: MapPin, color: '#059669', bg: '#d1fae5', title: 'נגישות', desc: 'שירותים ב-11 ערים, לכל גבר בישראל' },
                { icon: Clock, color: '#7c3aed', bg: '#ede9fe', title: 'מקצועיות', desc: 'עובדים סוציאליים, פסיכולוגים ומשפטנים' },
              ].map((v, i) => {
                const Icon = v.icon
                return (
                  <div key={i} className="card p-4 flex items-center gap-4 card-accent">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: v.bg }}>
                      <Icon size={18} style={{ color: v.color }} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#111827]">{v.title}</h3>
                      <p className="text-[13px] text-[#6b7280]">{v.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-[#1e40af] relative overflow-hidden">
        <div className="blob w-96 h-96 bg-[#2563eb]/60 -top-20 -right-20" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="section-heading-white mb-3">אנחנו בכל הארץ</h2>
          <p className="text-white/70 text-[16px] mb-10">פעילים ב-{locations.length} מיקומים ברחבי ישראל</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {locations.map(city => (
              <div key={city} className="flex items-center gap-1.5 bg-white/15 border border-white/25 text-white px-4 py-2.5 rounded-full text-[14px] font-medium backdrop-blur-sm">
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
            מוכנים להתחיל?
          </h2>
          <p className="section-lead mb-8">פנו אלינו היום וקבלו ייעוץ ראשוני ללא עלות.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-blue">
              צרו קשר
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
            <Link to="/services" className="btn btn-outline">השירותים שלנו</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
