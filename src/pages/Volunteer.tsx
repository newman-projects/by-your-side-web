import { useState } from 'react'
import { CheckCircle, Users } from 'lucide-react'
import { volunteersApi } from '../api/volunteers'

const interests = [
  'ייעוץ רגשי', 'ייעוץ משפטי', 'הדרכת קבוצות',
  'ניהול מינהלי', 'שיווק ותקשורת', 'טכנולוגיה',
  'הרצאות וסדנאות', 'ליווי אישי',
]

export default function Volunteer() {
  const [form, setForm] = useState({
    full_name: '', phone_number: '', profession: '',
    volunteer_interests: [] as string[], other_interest: '', motivation: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const toggle = (i: string) => setForm(f => ({
    ...f,
    volunteer_interests: f.volunteer_interests.includes(i)
      ? f.volunteer_interests.filter(x => x !== i)
      : [...f.volunteer_interests, i],
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.volunteer_interests.length) { setError('אנא בחרו לפחות תחום התנדבות אחד'); return }
    setLoading(true); setError('')
    try { await volunteersApi.submit(form); setSuccess(true) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'שגיאה בשליחת הטופס.') }
    finally { setLoading(false) }
  }

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#059669] to-[#10b981] overflow-hidden pt-28 pb-20">
        <div className="blob w-80 h-80 bg-white/10 -top-20 -right-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
            <Users size={26} className="text-white" />
          </div>
          <h1 className="section-heading-white mb-4">הצטרפו כמתנדבים</h1>
          <p className="text-white/80 text-[17px] max-w-xl mx-auto">
            לצדכם פועלת הודות למתנדבים מסורים. הצטרפו אלינו וסייעו לגברים שזקוקים לכם.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          {success ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-[#059669]" />
              </div>
              <h3 className="text-[22px] font-black text-[#111827] mb-2">תודה רבה!</h3>
              <p className="text-[#6b7280] text-[15px] leading-relaxed max-w-sm mx-auto">
                קיבלנו את בקשת ההתנדבות שלכם. נחזור אליכם בקרוב לתיאום פגישת היכרות.
              </p>
            </div>
          ) : (
            <div className="bg-[#F8FAFF] rounded-3xl p-8 border border-[#dbeafe]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">שם מלא *</label>
                    <input type="text" required placeholder="ישראל ישראלי"
                      value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
                      className="input bg-white" />
                  </div>
                  <div>
                    <label className="label">טלפון *</label>
                    <input type="tel" required placeholder="050-0000000"
                      value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })}
                      className="input bg-white" dir="ltr" />
                  </div>
                </div>

                <div>
                  <label className="label">מקצוע / תחום עיסוק *</label>
                  <input type="text" required placeholder="למשל: עורך דין, פסיכולוג, מהנדס..."
                    value={form.profession} onChange={e => setForm({ ...form, profession: e.target.value })}
                    className="input bg-white" />
                </div>

                <div>
                  <label className="label mb-3">תחומי התנדבות *</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(interest => {
                      const active = form.volunteer_interests.includes(interest)
                      return (
                        <button key={interest} type="button" onClick={() => toggle(interest)}
                          className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all border-2 ${
                            active
                              ? 'bg-[#059669] text-white border-[#059669] shadow-md'
                              : 'bg-white text-[#1f2937] border-[#d1fae5] hover:border-[#059669]/40'
                          }`}>
                          {interest}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="label">תחום נוסף (אופציונלי)</label>
                  <input type="text" placeholder="תחום אחר..."
                    value={form.other_interest} onChange={e => setForm({ ...form, other_interest: e.target.value })}
                    className="input bg-white" />
                </div>

                <div>
                  <label className="label">מה מניע אתכם להתנדב? *</label>
                  <textarea required rows={4} placeholder="ספרו לנו על המוטיבציה שלכם..."
                    value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })}
                    className="input bg-white resize-none" />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">{error}</div>
                )}

                <button type="submit" disabled={loading} className="btn btn-green w-full justify-center disabled:opacity-60">
                  <Users size={16} />
                  {loading ? 'שולח...' : 'הגישו מועמדות'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
