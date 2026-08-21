import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
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
    setLoading(true); setError('')
    try { await login(email, password); navigate('/') }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'שגיאה בכניסה. בדקו את הפרטים.') }
    finally { setLoading(false) }
  }

  return (
    <div dir="rtl" className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#F8FAFF]" />
      <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/60 -top-20 -right-20" />
      <div className="blob w-[350px] h-[350px] bg-[#ede9fe]/50 bottom-0 left-0" />

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#6b7280] text-[13px] hover:text-[#1e40af] transition-colors mb-6">
          <ArrowRight size={14} />
          חזרה לדף הבית
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#dbeafe] overflow-hidden">
          {/* Header strip */}
          <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] px-8 pt-8 pb-10 text-center">
            <img src="/logo.png" alt="לצדכם" className="h-12 w-auto mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-[22px] font-black text-white">ברוכים הבאים</h1>
            <p className="text-white/70 text-[14px] mt-1">היכנסו לחשבון שלכם</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">כתובת אימייל</label>
                <input type="email" required placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="input" dir="ltr" />
              </div>
              <div>
                <label className="label">סיסמה</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} required placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="input pl-10" dir="ltr" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1e40af] transition-colors">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">{error}</div>
              )}

              <button type="submit" disabled={loading}
                className="btn btn-blue w-full justify-center mt-2 disabled:opacity-60">
                {loading ? 'מתחבר...' : 'כניסה לחשבון'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[13px] text-[#6b7280]">
                אין לכם חשבון?{' '}
                <Link to="/signup" className="text-[#1e40af] font-bold hover:text-[#1c3a9e] transition-colors">
                  הרשמו עכשיו
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
