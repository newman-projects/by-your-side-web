import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { contactApi } from '../api/contact'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await contactApi.submit(form)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', message: '' })
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
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title mb-4">צרו קשר</h1>
          <p className="section-subtitle max-w-xl mx-auto">
            אנחנו כאן בשבילכם. פנו אלינו בכל שאלה, ונחזור אליכם בהקדם.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-[22px] font-bold text-[#1d1d1f] mb-6">פרטי התקשרות</h2>
              </div>

              {[
                {
                  icon: <Phone size={18} className="text-[#0071e3]" />,
                  title: 'טלפון',
                  value: '052-7090457',
                  href: 'tel:0527090457',
                },
                {
                  icon: <Mail size={18} className="text-[#0071e3]" />,
                  title: 'אימייל',
                  value: 'office.letsidchem@gmail.com',
                  href: 'mailto:office.letsidchem@gmail.com',
                },
                {
                  icon: <MapPin size={18} className="text-[#0071e3]" />,
                  title: 'כתובת ראשית',
                  value: 'מצדה 9, בני ברק',
                  href: undefined,
                },
                {
                  icon: <Clock size={18} className="text-[#0071e3]" />,
                  title: 'שעות פעילות',
                  value: 'ראשון–חמישי, 08:30–14:30',
                  href: undefined,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-2xl">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] text-[#86868b] mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[15px] font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[15px] font-medium text-[#1d1d1f]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 bg-[#0071e3]/5 rounded-2xl border border-[#0071e3]/10">
                <p className="text-[13px] font-semibold text-[#0071e3] mb-1">סניפים ברחבי הארץ</p>
                <p className="text-[13px] text-[#86868b] leading-relaxed">
                  בני ברק • ראשון לציון • ירושלים • תל אביב • טבריה • חיפה • מודיעין ועוד
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-2">ההודעה נשלחה!</h3>
                  <p className="text-[#86868b] text-[15px]">ניצור איתכם קשר בהקדם האפשרי.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-8 apple-btn apple-btn-primary"
                  >
                    שלחו הודעה נוספת
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-[22px] font-bold text-[#1d1d1f] mb-6">השאירו פרטים</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>שם מלא *</label>
                      <input
                        type="text"
                        required
                        placeholder="ישראל ישראלי"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>טלפון</label>
                      <input
                        type="tel"
                        placeholder="050-0000000"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>אימייל *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>הודעה *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="ספרו לנו במה תרצו עזרה..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
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
                    {loading ? 'שולח...' : 'שלח הודעה'}
                  </button>

                  <p className="text-[12px] text-[#86868b] text-center">
                    פרטיכם נשמרים בסודיות ולא יועברו לגורמים חיצוניים
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
