import { Link } from 'react-router-dom'
import { Heart, Users, MapPin, Clock, ArrowLeft } from 'lucide-react'

const locations = [
  'בני ברק', 'רמת גן', 'תל אביב', 'טבריה',
  'ראשון לציון', 'ירושלים', 'נהר', 'פרדס חנה',
  'מודיעין', 'גוש עציון', 'כפר מלא',
]

const team_values = [
  {
    icon: <Heart className="text-red-500" size={22} />,
    title: 'אמפתיה',
    desc: 'אנחנו מאמינים שכל גבר ראוי לשמיעה, כבוד וטיפול מקצועי ואנושי.',
  },
  {
    icon: <Users className="text-[#0071e3]" size={22} />,
    title: 'קהילה',
    desc: 'יחד חזקים יותר. אנחנו בונים קהילה של תמיכה הדדית לאבות גרושים.',
  },
  {
    icon: <MapPin className="text-green-500" size={22} />,
    title: 'נגישות',
    desc: 'שירותים בפריסה ארצית כדי שכל גבר בישראל יוכל לקבל עזרה.',
  },
  {
    icon: <Clock className="text-orange-500" size={22} />,
    title: 'מקצועיות',
    desc: 'צוות מוסמך של עובדים סוציאליים, פסיכולוגים ומשפטנים.',
  },
]

export default function About() {
  return (
    <div dir="rtl" className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="section-title mb-6">אודות לצדכם</h1>
            <p className="section-subtitle leading-relaxed">
              לצדכם הוא מרכז לתמיכה מקצועית, סיוע נפשי, טיפול ושיקום גברים נפגעי אלימות ואבות גרושים בישראל.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#0071e3] text-[13px] font-semibold uppercase tracking-wider mb-3 block">המשימה שלנו</span>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#1d1d1f] mb-6 leading-tight">
                אנחנו מאמינים שכל אבא ראוי לתמיכה
              </h2>
              <div className="space-y-5 text-[#86868b] text-[16px] leading-relaxed">
                <p>
                  לצדכם הוקמה מתוך הכרה כי אבות רבים בישראל מוצאים את עצמם לבד מול מערכת מסובכת של גירושין, ניכור הורי, משמורת וסוגיות משפטיות — ללא תמיכה מקצועית ומותאמת.
                </p>
                <p>
                  אנחנו מספקים מרחב בטוח ומכבד בו גברים יכולים לקבל עזרה, לשתף, ולחזור לתפקד כאבות טובים ואנשים שלמים.
                </p>
                <p>
                  הארגון פועל בשיתוף עם עובדים סוציאליים מוסמכים, פסיכולוגים, עורכי דין ומתנדבים רבים, ומציע שירותים בפריסה ארצית ב-11 ערים ברחבי ישראל.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2,000+', label: 'גברים טיפלנו' },
                { num: '10', label: 'שנות פעילות' },
                { num: '11', label: 'סניפים ברחבי הארץ' },
                { num: '50+', label: 'מתנדבים ומטפלים' },
              ].map((s, i) => (
                <div key={i} className="bg-[#f5f5f7] rounded-2xl p-6 text-center">
                  <div className="text-[2rem] font-bold text-[#0071e3] mb-1">{s.num}</div>
                  <div className="text-[13px] text-[#86868b]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">למי אנחנו פונים</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              לצדכם עוזרת לגברים המתמודדים עם מצבי חיים מורכבים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'אבות גרושים', desc: 'גברים שעוברים תהליך גירושין ומתמודדים עם משמורת וקשר עם ילדיהם' },
              { title: 'קורבנות ניכור הורי', desc: 'אבות שנמנעת מהם גישה לילדיהם עקב ניכור הורי מכוון' },
              { title: 'נפגעי אלימות', desc: 'גברים הסובלים מאלימות פיזית, רגשית או מינית בתוך הקשר הזוגי' },
              { title: 'מצבי האשמת שווא', desc: 'גברים המתמודדים עם האשמות שווא בהליכי גירושין ומשמורת' },
              { title: 'מילואימניקים ומשפחות', desc: 'חיילי מילואים ומשפחותיהם הזקוקים לתמיכה נפשית בתקופות לחץ' },
              { title: 'גברים בהליכי גירושין', desc: 'כל גבר החווה את משבר הגירושין וזקוק לסיוע מקצועי ורגשי' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 card-hover">
                <div className="w-2 h-2 rounded-full bg-[#0071e3] mb-4" />
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">הערכים שלנו</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team_values.map((v, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{v.title}</h3>
                <p className="text-[14px] text-[#86868b] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">אנחנו בכל הארץ</h2>
            <p className="section-subtitle">פעילים ב-{locations.length} מיקומים ברחבי ישראל</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {locations.map(city => (
              <div key={city} className="flex items-center gap-1.5 bg-white px-4 py-2.5 rounded-full border border-black/5 text-[14px] text-[#1d1d1f] font-medium shadow-sm">
                <MapPin size={13} className="text-[#0071e3]" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#1d1d1f] mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-[#86868b] text-[16px] mb-8">
            פנו אלינו היום וקבלו ייעוץ ראשוני ללא עלות.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/contact" className="apple-btn apple-btn-primary">
              צרו קשר
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
            <Link to="/services" className="apple-btn apple-btn-secondary">
              השירותים שלנו
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
