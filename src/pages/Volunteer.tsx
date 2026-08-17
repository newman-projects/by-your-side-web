import { useState } from 'react'
import { CheckCircle, Heart } from 'lucide-react'
import { volunteersApi } from '../api/volunteers'

const interests = [
  'ייעוץ רגשי',
  'ייעוץ משפטי',
  'הדרכת קבוצות',
  'ניהול מינהלי',
  'שיווק ותקשורת',
  'טכנולוגיה',
  'הרצאות וסדנאות',
  'ליווי אישי',
]

export default function Volunteer() {
  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    profession: '',
    volunteer_interests: [] as string[],
    other_interest: '',
    motivation: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const toggleInterest = (interest: string) => {
    setForm(f => ({
      ...f,
      volunteer_interests: f.volunteer_interests.includes(interest)
        ? f.volunteer_interests.filter(i => i !== interest)
        : [...f.volunteer_interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.volunteer_interests.length === 0) {
      setError('אנא בחרו לפחות תחום התנדבות אחד')
      return
    }
    setLoading(true)
    setError('')
    try {
      await volunteersApi.submit(form)
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'שגיאה בשליחת הטופס. נסו שוב.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-black/10 rounded-xl text-[15px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/25 focus:border-[#0071e3] transition-all placeholder-[#86868b]"
  const labelClass = "block text-[13px] font-medium text-[#1d1d1f] mb-1.5"

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart size={26} className="text-red-500" />
          </div>
          <h1 className="section-title mb-4">הצטרפו כמתנדבים</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            לצדכם פועלת הודות למתנדבים מסורים. הצטרפו אלינו וסייעו לגברים שזקוקים לכם.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {success ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-2">תודה רבה!</h3>
              <p className="text-[#86868b] text-[15px] leading-relaxed">
                קיבלנו את בקשת ההתנדבות שלכם. נחזור אליכם בקרוב לתיאום פגישת היכרות.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>שם מלא *</label>
                  <input
                    type="text"
                    required
                    placeholder="ישראל ישראלי"
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>מספר טלפון *</label>
                  <input
                    type="tel"
                    required
                    placeholder="050-0000000"
                    value={form.phone_number}
                    onChange={e => setForm({ ...form, phone_number: e.target.value })}
                    className={inputClass}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>מקצוע / תחום עיסוק *</label>
                <input
                  type="text"
                  required
                  placeholder="למשל: עורך דין, פסיכולוג, מהנדס..."
                  value={form.profession}
                  onChange={e => setForm({ ...form, profession: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>תחומי התנדבות *</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${
                        form.volunteer_interests.includes(interest)
                          ? 'bg-[#0071e3] text-white border-[#0071e3]'
                          : 'bg-white text-[#1d1d1f] border-black/10 hover:border-[#0071e3]/30'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>תחום נוסף (אופציונלי)</label>
                <input
                  type="text"
                  placeholder="תחום אחר שתרצו לתרום..."
                  value={form.other_interest}
                  onChange={e => setForm({ ...form, other_interest: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>מה מניע אתכם להתנדב? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="ספרו לנו על המוטיבציה שלכם להצטרף..."
                  value={form.motivation}
                  onChange={e => setForm({ ...form, motivation: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-[13px] bg-red-50 px-4 py-3 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="apple-btn apple-btn-primary w-full text-[15px] disabled:opacity-60"
              >
                <Heart size={15} />
                {loading ? 'שולח...' : 'הגישו מועמדות'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
