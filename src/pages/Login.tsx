import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'שגיאה בכניסה. בדקו את הפרטים ונסו שוב.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-black/10 rounded-xl text-[15px] bg-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/25 focus:border-[#0071e3] transition-all placeholder-[#86868b]"

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0071e3] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">BY</span>
            </div>
            <span className="font-semibold text-[#1d1d1f] text-[17px]">לצדכם</span>
          </Link>
          <h1 className="text-[24px] font-bold text-[#1d1d1f] mt-6 mb-1">ברוכים הבאים</h1>
          <p className="text-[#86868b] text-[14px]">היכנסו לחשבון שלכם</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#1d1d1f] mb-1.5">אימייל</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
              {loading ? 'מתחבר...' : 'כניסה'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[13px] text-[#86868b]">
              אין לכם חשבון?{' '}
              <Link to="/signup" className="text-[#0071e3] font-medium hover:text-[#0077ed]">
                הרשמו עכשיו
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#86868b] mt-6">
          <Link to="/" className="hover:text-[#1d1d1f] transition-colors">
            ← חזרה לדף הבית
          </Link>
        </p>
      </div>
    </div>
  )
}
