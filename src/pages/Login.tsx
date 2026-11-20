import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Mail, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../api/auth'

type Mode = 'email' | 'whatsapp' | 'google'
type WaStep = 'phone' | 'otp'

export default function Login() {
  const [mode, setMode] = useState<Mode>('email')

  // Email
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  // WhatsApp
  const [waPhone, setWaPhone] = useState('')
  const [waStep, setWaStep] = useState<WaStep>('phone')
  const [waOtp, setWaOtp] = useState('')
  const [waLoading, setWaLoading] = useState(false)
  const [waError, setWaError] = useState('')

  // Google
  const [googleLoading, setGoogleLoading] = useState(false)

  const { login, loginWithTokens } = useAuth()
  const navigate = useNavigate()

  // ── Email ──────────────────────────────────────────────
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailLoading(true); setEmailError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err: unknown) {
      setEmailError(err instanceof Error ? err.message : 'שגיאה בכניסה. בדקו את הפרטים.')
    } finally {
      setEmailLoading(false)
    }
  }

  // ── WhatsApp ───────────────────────────────────────────
  const handleWaSend = async () => {
    const phone = waPhone.trim()
    if (phone.length < 7) { setWaError('הזינו מספר טלפון תקין.'); return }
    setWaLoading(true); setWaError('')
    try {
      await authApi.whatsappLoginOtp(phone)
      setWaStep('otp')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'שגיאה בשליחת הקוד'
      if (msg.includes('not found') || msg.includes('no account')) {
        setWaError(`לא נמצא חשבון עם המספר הזה. האם תרצו להירשם?`)
      } else {
        setWaError(msg)
      }
    } finally {
      setWaLoading(false)
    }
  }

  const handleWaVerify = async () => {
    const code = waOtp.trim()
    if (code.length !== 6) { setWaError('הזינו קוד בן 6 ספרות.'); return }
    setWaLoading(true); setWaError('')
    try {
      const res = await authApi.whatsappLoginVerify(waPhone.trim(), code)
      loginWithTokens(res.access_token, res.user.profile)
      navigate('/')
    } catch (err: unknown) {
      setWaError(err instanceof Error ? err.message : 'קוד לא תקין')
    } finally {
      setWaLoading(false)
    }
  }

  // ── Google ─────────────────────────────────────────────
  const handleGoogle = async () => {
    setGoogleLoading(true)
    try {
      const callbackUrl = `${window.location.origin}/auth/callback`
      const { url } = await authApi.getGoogleUrl(callbackUrl)
      window.location.href = url
    } catch {
      setGoogleLoading(false)
    }
  }

  const anyLoading = emailLoading || waLoading || googleLoading

  return (
    <div dir="rtl" className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8FAFF]" />
      <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/60 -top-20 -right-20" />
      <div className="blob w-[350px] h-[350px] bg-[#ede9fe]/50 bottom-0 left-0" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#6b7280] text-[13px] hover:text-[#1e40af] transition-colors mb-6">
          <ArrowRight size={14} />
          חזרה לדף הבית
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border border-[#dbeafe] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] px-8 pt-8 pb-10 text-center">
            <img src="/logo.png" alt="לצדכם" className="h-12 w-auto mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-[22px] font-black text-white">ברוכים הבאים</h1>
            <p className="text-white/70 text-[14px] mt-1">היכנסו לחשבון שלכם</p>
          </div>

          <div className="px-8 py-8">
            {/* Tabs */}
            <div className="flex bg-[#EEF2FF] rounded-xl p-1 gap-1 mb-7">
              {(['email', 'whatsapp', 'google'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setEmailError(''); setWaError('') }}
                  disabled={anyLoading}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[12px] font-semibold transition-all ${
                    mode === m
                      ? 'bg-white shadow text-[#1e40af]'
                      : 'text-[#6b7280] hover:text-[#374151]'
                  }`}
                >
                  {m === 'email' && <Mail size={13} className={mode === 'email' ? 'text-[#2563eb]' : 'text-[#9ca3af]'} />}
                  {m === 'whatsapp' && (
                    <svg viewBox="0 0 24 24" width="13" height="13" fill={mode === 'whatsapp' ? '#25D366' : '#9ca3af'}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  )}
                  {m === 'google' && (
                    <svg viewBox="0 0 24 24" width="13" height="13">
                      <path fill={mode === 'google' ? '#4285F4' : '#9ca3af'} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill={mode === 'google' ? '#34A853' : '#9ca3af'} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill={mode === 'google' ? '#FBBC05' : '#9ca3af'} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill={mode === 'google' ? '#EA4335' : '#9ca3af'} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {m === 'email' ? 'אימייל' : m === 'whatsapp' ? 'WhatsApp' : 'Google'}
                </button>
              ))}
            </div>

            {/* ── Email form ── */}
            {mode === 'email' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="label">כתובת אימייל</label>
                  <input type="email" required placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="input" dir="ltr" disabled={anyLoading} />
                </div>
                <div>
                  <label className="label">סיסמה</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} required placeholder="••••••••"
                      value={password} onChange={e => setPassword(e.target.value)}
                      className="input pl-10" dir="ltr" disabled={anyLoading} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1e40af] transition-colors">
                      {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                {emailError && <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">{emailError}</div>}
                <button type="submit" disabled={anyLoading}
                  className="btn btn-blue w-full justify-center mt-2 disabled:opacity-60">
                  {emailLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {emailLoading ? 'מתחבר...' : 'כניסה לחשבון'}
                </button>
              </form>
            )}

            {/* ── WhatsApp form ── */}
            {mode === 'whatsapp' && (
              <div className="space-y-4">
                {waStep === 'phone' ? (
                  <>
                    <p className="text-[13px] text-[#6b7280]">הזינו את מספר הטלפון שלכם. נבדוק אם יש לכם חשבון ונשלח קוד דרך WhatsApp.</p>
                    <div>
                      <label className="label">מספר טלפון</label>
                      <input
                        type="tel" placeholder="+972 50 000 0000"
                        value={waPhone} onChange={e => setWaPhone(e.target.value)}
                        className="input" dir="ltr" disabled={waLoading}
                        onKeyDown={e => e.key === 'Enter' && handleWaSend()}
                      />
                    </div>
                    {waError && (
                      <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">
                        {waError}
                        {waError.includes('להירשם') && (
                          <> <Link to="/signup" className="underline font-bold">הירשמו כאן</Link></>
                        )}
                      </div>
                    )}
                    <button onClick={handleWaSend} disabled={!waPhone || waLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#25D366] text-white font-bold text-[15px] hover:bg-[#22c55e] transition-colors disabled:opacity-50">
                      {waLoading ? <Loader2 size={16} className="animate-spin" /> : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      )}
                      {waLoading ? 'שולח...' : 'שלח קוד WhatsApp'}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[13px] text-[#6b7280]">הזינו את הקוד בן 6 הספרות שנשלח ל-{waPhone} דרך WhatsApp.</p>
                    <input
                      type="text" inputMode="numeric" maxLength={6}
                      placeholder="000000"
                      value={waOtp} onChange={e => setWaOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-2 border-[#25D366] rounded-2xl py-4 text-center text-[32px] font-bold tracking-[14px] text-[#1e1b4b] focus:outline-none focus:border-[#16a34a]"
                      autoFocus disabled={waLoading}
                    />
                    {waError && <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">{waError}</div>}
                    <button onClick={handleWaVerify} disabled={waOtp.length !== 6 || waLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#25D366] text-white font-bold text-[15px] hover:bg-[#22c55e] transition-colors disabled:opacity-50">
                      {waLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                      {waLoading ? 'מאמת...' : 'אמת והתחבר'}
                    </button>
                    <button onClick={() => { setWaStep('phone'); setWaOtp(''); setWaError('') }} disabled={waLoading}
                      className="w-full text-center text-[13px] text-[#6b7280] hover:text-[#374151] py-2">
                      שנה מספר ←
                    </button>
                  </>
                )}
              </div>
            )}

            {/* ── Google ── */}
            {mode === 'google' && (
              <div className="flex flex-col items-center gap-5 py-4">
                <div className="w-16 h-16 rounded-full bg-[#F0F4FF] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                {googleLoading ? (
                  <div className="flex items-center gap-2 text-[#6b7280] text-[14px]">
                    <Loader2 size={16} className="animate-spin text-[#4285F4]" />
                    פותח כניסה עם Google...
                  </div>
                ) : (
                  <button onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-2xl border-2 border-[#E5E7EB] bg-white text-[#374151] font-semibold text-[15px] hover:border-[#4285F4] hover:bg-[#F8FAFF] transition-all">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    המשך עם Google
                  </button>
                )}
              </div>
            )}

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
