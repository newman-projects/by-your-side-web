import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const amounts = [50, 100, 200, 500, 1000]

const impact = [
  { amount: '₪50',  desc: 'מממנת שעת ייעוץ לאב גרוש הזקוק לעזרה דחופה' },
  { amount: '₪150', desc: 'מממנת מפגש קבוצת תמיכה שלם לשמונה אבות' },
  { amount: '₪500', desc: 'מממנת חודש שלם של ליווי אישי לאב בתהליך גירושין' },
]

export default function Donate() {
  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const { user } = useAuth()
  const amount = custom ? Number(custom) : selected

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1e40af] to-[#2563eb] overflow-hidden pt-28 pb-24">
        <div className="blob w-96 h-96 bg-[#2563eb]/50 -top-20 -right-20" />
        <div className="blob w-64 h-64 bg-white/5 bottom-0 left-0" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
            <Heart size={26} className="text-white fill-white" />
          </div>
          <h1 className="section-heading-white mb-4">תרמו ועזרו</h1>
          <p className="text-white/75 text-[17px] max-w-xl mx-auto">
            כל תרומה מאפשרת לנו להמשיך ולסייע לאבות גרושים ברחבי ישראל.
          </p>
        </div>
      </section>

      {/* Donation form */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-5 sm:px-8">
          <div className="card p-8 border border-[#dbeafe]">
            {/* Monthly toggle */}
            <div className="flex bg-[#F8FAFF] p-1 rounded-2xl mb-6 border border-[#dbeafe]">
              {[{ v: false, l: 'תרומה חד פעמית' }, { v: true, l: 'תרומה חודשית' }].map(opt => (
                <button key={String(opt.v)} onClick={() => setIsMonthly(opt.v)}
                  className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${
                    isMonthly === opt.v ? 'bg-white shadow text-[#1e40af] border border-[#dbeafe]' : 'text-[#6b7280]'
                  }`}>
                  {opt.l}
                </button>
              ))}
            </div>

            {/* Amount grid */}
            <label className="label mb-2">סכום תרומה</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {amounts.map(a => (
                <button key={a} onClick={() => { setSelected(a); setCustom('') }}
                  className={`py-3 rounded-xl text-[15px] font-black transition-all border-2 ${
                    selected === a && !custom
                      ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-md'
                      : 'bg-white text-[#1f2937] border-[#dbeafe] hover:border-[#1e40af]/40'
                  }`}>
                  ₪{a}
                </button>
              ))}
            </div>
            <div className="relative mb-6">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] font-bold">₪</span>
              <input type="number" min="1" placeholder="סכום אחר"
                value={custom} onChange={e => { setCustom(e.target.value); setSelected(null) }}
                className="input pr-8" dir="ltr" />
            </div>

            {/* Summary */}
            {amount && amount > 0 && (
              <div className="bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] rounded-2xl px-5 py-4 mb-5 flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#1e40af]">
                  תרומה {isMonthly ? 'חודשית' : 'חד פעמית'}
                </span>
                <span className="text-[22px] font-black text-[#1e40af]">₪{amount}</span>
              </div>
            )}

            {user ? (
              <button
                className="btn btn-orange w-full justify-center disabled:opacity-40"
                disabled={!amount || amount <= 0}
                onClick={() => alert('מערכת תשלום תתווסף בקרוב')}
              >
                <Heart size={16} className="fill-white" />
                תרמו ₪{amount || 0}{isMonthly ? ' לחודש' : ''}
              </button>
            ) : (
              <div>
                <Link to="/login" className="btn btn-blue w-full justify-center block text-center">
                  כניסה לביצוע תרומה
                </Link>
                <p className="text-[12px] text-center text-[#9ca3af] mt-2">יש להתחבר כדי לבצע תרומה</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#9ca3af]">
              <Lock size={11} />
              תשלום מאובטח. קבלה תישלח לאימייל שלכם.
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-[#F8FAFF]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-black text-[#111827] text-center mb-10">
            מה תרומתכם מאפשרת
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {impact.map((item, i) => (
              <div key={i} className="card card-accent p-6 text-center">
                <div className="text-[2.25rem] font-black text-[#1e40af] mb-3">{item.amount}</div>
                <p className="text-[14px] text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="flex gap-1.5 justify-center mb-4">
            {Array(5).fill(0).map((_, i) => (
              <Heart key={i} size={18} className="text-[#f97316] fill-[#f97316]" />
            ))}
          </div>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#111827] mb-3">
            תודה לכל תורמינו
          </h2>
          <p className="text-[#6b7280] text-[15px] leading-relaxed">
            הודות לתמיכתכם הנדיבה אנחנו יכולים להמשיך ולהיות לצד אלפי גברים בישראל המתמודדים עם האתגרים הקשים ביותר בחייהם.
          </p>
        </div>
      </section>
    </div>
  )
}
