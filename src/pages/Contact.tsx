import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { contactApi } from '../api/contact'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try { await contactApi.submit(form); setSuccess(true); setForm({ name: '', email: '', phone: '', message: '' }) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'שגיאה בשליחת הטופס. נסו שוב.') }
    finally { setLoading(false) }
  }

  const contacts = [
    { icon: Phone,  title: 'טלפון',        value: '052-7090457',              href: 'tel:0527090457' },
    { icon: Mail,   title: 'אימייל',        value: 'office.letsidchem@gmail.com', href: 'mailto:office.letsidchem@gmail.com' },
    { icon: MapPin, title: 'כתובת ראשית',   value: 'מצדה 9, בני ברק',          href: undefined },
    { icon: Clock,  title: 'שעות פעילות',   value: 'א׳–ה׳, 08:30–14:30',       href: undefined },
  ]

  return (
    <div dir="rtl" className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#F8FAFF] overflow-hidden pt-28 pb-16">
        <div className="blob w-96 h-96 bg-[#dbeafe]/60 -top-20 -right-20" />
        <div className="blob w-64 h-64 bg-[#ede9fe]/40 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="section-eyebrow mb-3">צרו קשר</p>
          <h1 className="section-heading mb-4">אנחנו כאן בשבילכם</h1>
          <p className="section-lead max-w-xl mx-auto">
            פנו אלינו בכל שאלה. נחזור אליכם בהקדם האפשרי.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
            <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-[20px] font-black text-[#111827] mb-6">פרטי התקשרות</h2>
              {contacts.map((c, i) => {
                const Icon = c.icon
                return (
                  <div key={i} className="card card-accent p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#1e40af]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#9ca3af] font-semibold uppercase tracking-wider mb-0.5">{c.title}</p>
                      {c.href
                        ? <a href={c.href} className="text-[14px] font-semibold text-[#111827] hover:text-[#1e40af] transition-colors">{c.value}</a>
                        : <p className="text-[14px] font-semibold text-[#111827]">{c.value}</p>
                      }
                    </div>
                  </div>
                )
              })}

              <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] rounded-2xl p-5 text-white mt-6">
                <p className="text-[13px] font-bold mb-1">סניפים ברחבי הארץ</p>
                <p className="text-white/70 text-[12px] leading-relaxed">
                  בני ברק • ראשון לציון • ירושלים • תל אביב • רמת גן • טבריה • מודיעין ועוד
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-[#059669]" />
                  </div>
                  <h3 className="text-[22px] font-black text-[#111827] mb-2">ההודעה נשלחה!</h3>
                  <p className="text-[#6b7280] text-[15px]">ניצור איתכם קשר בהקדם האפשרי.</p>
                  <button onClick={() => setSuccess(false)} className="btn btn-blue mt-8">
                    שלחו הודעה נוספת
                  </button>
                </div>
              ) : (
                <div className="bg-[#F8FAFF] rounded-3xl p-8 border border-[#dbeafe]">
                  <h2 className="text-[20px] font-black text-[#111827] mb-6">השאירו פרטים</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">שם מלא *</label>
                        <input type="text" required placeholder="ישראל ישראלי"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="input bg-white" />
                      </div>
                      <div>
                        <label className="label">טלפון</label>
                        <input type="tel" placeholder="050-0000000"
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="input bg-white" dir="ltr" />
                      </div>
                    </div>
                    <div>
                      <label className="label">אימייל *</label>
                      <input type="email" required placeholder="you@example.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        className="input bg-white" dir="ltr" />
                    </div>
                    <div>
                      <label className="label">הודעה *</label>
                      <textarea required rows={5} placeholder="ספרו לנו במה תרצו עזרה..."
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="input bg-white resize-none" />
                    </div>
                    {error && (
                      <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">{error}</div>
                    )}
                    <button type="submit" disabled={loading} className="btn btn-blue w-full justify-center disabled:opacity-60">
                      {loading ? 'שולח...' : 'שלח הודעה'}
                    </button>
                    <p className="text-[11px] text-[#9ca3af] text-center">
                      פרטיכם נשמרים בסודיות ולא יועברו לגורמים חיצוניים
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
