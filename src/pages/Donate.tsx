import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const amounts = [50, 100, 200, 500, 1000]

export default function Donate() {
  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const { user } = useAuth()

  const amount = custom ? Number(custom) : selected

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Heart size={28} className="text-red-500" />
          </div>
          <h1 className="section-title mb-4">תרמו ותעזרו</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            תרומתכם מאפשרת לנו להמשיך ולסייע לאבות גרושים ברחבי ישראל. כל שקל תורם.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          {/* Type toggle */}
          <div className="flex bg-[#f5f5f7] p-1 rounded-2xl mb-8">
            {[
              { id: false, label: 'תרומה חד פעמית' },
              { id: true, label: 'תרומה חודשית' },
            ].map(opt => (
              <button
                key={String(opt.id)}
                onClick={() => setIsMonthly(opt.id)}
                className={`flex-1 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                  isMonthly === opt.id
                    ? 'bg-white shadow-sm text-[#1d1d1f]'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Amount selection */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#1d1d1f] mb-3">בחרו סכום תרומה</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {amounts.map(a => (
                <button
                  key={a}
                  onClick={() => { setSelected(a); setCustom('') }}
                  className={`py-3 rounded-xl text-[15px] font-semibold transition-all border ${
                    selected === a && !custom
                      ? 'bg-[#0071e3] text-white border-[#0071e3]'
                      : 'bg-white text-[#1d1d1f] border-black/10 hover:border-[#0071e3]/30'
                  }`}
                >
                  ₪{a}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] text-[14px]">₪</span>
              <input
                type="number"
                min="1"
                placeholder="סכום אחר"
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null) }}
                className="w-full pr-8 pl-4 py-3 border border-black/10 rounded-xl text-[15px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/25 focus:border-[#0071e3] placeholder-[#86868b]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Summary */}
          {amount && amount > 0 && (
            <div className="bg-[#0071e3]/5 border border-[#0071e3]/15 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[14px] text-[#1d1d1f]">
                  תרומה {isMonthly ? 'חודשית' : 'חד פעמית'}
                </span>
                <span className="text-[18px] font-bold text-[#0071e3]">₪{amount}</span>
              </div>
            </div>
          )}

          {/* CTA */}
          {user ? (
            <button
              className="apple-btn apple-btn-primary w-full text-[16px] disabled:opacity-40"
              disabled={!amount || amount <= 0}
              onClick={() => alert('תשלום מאובטח יתווסף בקרוב')}
            >
              <Heart size={16} />
              תרמו ₪{amount || 0} {isMonthly ? 'לחודש' : ''}
            </button>
          ) : (
            <div>
              <Link
                to="/login"
                className="apple-btn apple-btn-primary w-full text-[16px] text-center block"
              >
                כניסה לתרומה
              </Link>
              <p className="text-[12px] text-center text-[#86868b] mt-3">
                יש להתחבר כדי לבצע תרומה
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-[#86868b]">
            <Lock size={12} />
            <span>תשלום מאובטח ומוגן. קבלה תישלח לאימייל שלכם.</span>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#1d1d1f] text-center mb-10">
            מה תרומתכם מאפשרת
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { amount: '₪50', desc: 'מממנת שעת ייעוץ לאב גרוש הזקוק לעזרה דחופה' },
              { amount: '₪150', desc: 'מממנת מפגש קבוצת תמיכה שלם לשמונה אבות' },
              { amount: '₪500', desc: 'מממנת חודש שלם של ליווי אישי לאב בתהליך גירושין' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center card-hover border border-black/5">
                <div className="text-[2rem] font-bold text-[#0071e3] mb-2">{item.amount}</div>
                <p className="text-[14px] text-[#86868b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex gap-1 justify-center mb-4">
            {Array(3).fill(0).map((_, i) => (
              <Heart key={i} size={20} className="text-red-400 fill-red-400" />
            ))}
          </div>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-[#1d1d1f] mb-3">
            תודה לכל תורמינו
          </h2>
          <p className="text-[#86868b] text-[15px] leading-relaxed">
            הודות לתמיכתכם הנדיבה, אנחנו יכולים להמשיך ולהיות לצד אלפי גברים בישראל המתמודדים עם אחד האתגרים הקשים בחייהם.
          </p>
        </div>
      </section>
    </div>
  )
}
