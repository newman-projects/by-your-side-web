import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { authApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const [error, setError] = useState('')
  const { loginWithTokens } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
      setError('לא נמצאו פרטי אימות. נסו שוב.')
      return
    }

    authApi.googleCallback(accessToken, refreshToken)
      .then(res => {
        loginWithTokens(res.access_token, res.user.profile)
        navigate('/', { replace: true })
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'אימות Google נכשל. נסו שוב.')
      })
  }, [])

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#F8FAFF] px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-[#dbeafe] p-10 max-w-sm w-full text-center">
          <p className="text-red-600 text-[15px] mb-6">{error}</p>
          <button onClick={() => navigate('/login')} className="btn btn-blue w-full justify-center">
            חזרה לכניסה
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={40} className="animate-spin text-[#2563eb]" />
        <p className="text-[#6b7280] text-[15px]">מסיים כניסה עם Google...</p>
      </div>
    </div>
  )
}
