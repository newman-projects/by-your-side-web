import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signup(form.email, form.password, form.full_name)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'שגיאה בהרשמה. נסו שוב.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-black/10 rounded-xl text-[15px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/25 focus:border-[#0071e3] transition-all placeholder-[#86868b]"

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0071e3] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">BY</span>
            </div>
            <span className="font-semibold text-[#1d1d1f] text-[17px]">לצדכם</span>
          </Link>
          <h1 className="text-[24px] font-bold text-[#1d1d1f] mt-6 mb-1">יצירת חשבון</h1>
          <p className="text-[#86868b] text-[14px]">הצטרפו לקהילת לצדכם</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">שם מלא</label>
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
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">אימייל</label>
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
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">סיסמה</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="לפחות 6 תווים"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={`${inputClass} pl-10`}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] bg-red-50 px-4 py-3 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="apple-btn apple-btn-primary w-full text-[15px] mt-2 disabled:opacity-60"
            >
              {loading ? 'יוצר חשבון...' : 'הרשמה'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[13px] text-[#86868b]">
              כבר יש לכם חשבון?{' '}
              <Link to="/login" className="text-[#0071e3] font-medium hover:text-[#0077ed]">
                כניסה
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#86868b] mt-6">
          בהרשמה אתם מסכימים לתנאי השימוש ומדיניות הפרטיות שלנו.
        </p>
      </div>
    </div>
  )
}
