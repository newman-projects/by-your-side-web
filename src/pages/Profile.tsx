import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, LogOut, Camera, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'

export default function Profile() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saved, setSaved] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | undefined>(undefined)
  const [displayName, setDisplayName] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
    if (user) {
      setFullName(user.full_name ?? '')
      setPhoneNumber(user.phone_number ?? '')
      setDisplayName(user.full_name ?? '')
      setLocalAvatarUrl(user.avatar_url)
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-[#1e40af]" />
      </div>
    )
  }

  if (!user) return null

  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveError('')
    setSaved(false)
    try {
      await api.put(`/users/${user.id}`, { full_name: fullName, phone_number: phoneNumber || undefined })
      setDisplayName(fullName)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'שגיאה בשמירה')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await api.postForm<{ avatar_url: string }>(`/users/${user.id}/avatar`, form)
      if (res?.avatar_url) setLocalAvatarUrl(res.avatar_url)
    } catch {
      // silently ignore avatar upload errors
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div dir="rtl" className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8FAFF]" />
      <div className="blob w-[500px] h-[500px] bg-[#dbeafe]/60 -top-20 -right-20" />
      <div className="blob w-[350px] h-[350px] bg-[#ede9fe]/50 bottom-0 left-0" />

      <div className="relative w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl border border-[#dbeafe] overflow-hidden">

          {/* Blue header */}
          <div className="bg-gradient-to-br from-[#1e40af] to-[#2563eb] px-8 pt-8 pb-14 text-center relative">
            <h1 className="text-[22px] font-black text-white">הפרופיל שלי</h1>
            <p className="text-white/70 text-[14px] mt-1">{user.email}</p>
          </div>

          {/* Avatar — overlaps header */}
          <div className="flex justify-center -mt-10 mb-2 relative z-10">
            <div className="relative group">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#1e40af] flex items-center justify-center focus:outline-none"
                title="שנה תמונת פרופיל"
              >
                {avatarUploading ? (
                  <Loader2 size={22} className="animate-spin text-white" />
                ) : localAvatarUrl ? (
                  <img src={localAvatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[26px] font-black text-white select-none">{initials || '?'}</span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera size={18} className="text-white" />
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Name + admin badge */}
          <div className="text-center mb-6 px-8">
            <p className="text-[18px] font-bold text-[#1e1b4b]">{displayName}</p>
            {user.is_admin && (
              <span className="inline-flex items-center mt-1.5 px-3 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338ca] text-[12px] font-semibold">
                מנהל
              </span>
            )}
          </div>

          <div className="px-8 pb-8">

            {/* Success banner */}
            {saved && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[13px] px-4 py-3 rounded-xl mb-5">
                <CheckCircle2 size={16} className="shrink-0" />
                הפרופיל עודכן בהצלחה
              </div>
            )}

            {/* Edit form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="label">שם מלא</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="input"
                  placeholder="ישראל ישראלי"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="label">מספר טלפון</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="input"
                  placeholder="+972 50 000 0000"
                  dir="ltr"
                  disabled={saving}
                />
              </div>

              {saveError && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl">
                  {saveError}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="btn btn-blue w-full justify-center disabled:opacity-60"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {saving ? 'שומר...' : 'שמור שינויים'}
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-[#f3f4f6] my-6" />

            {/* Password section */}
            <div className="bg-[#F8FAFF] border border-[#dbeafe] rounded-2xl px-4 py-4">
              <p className="text-[13px] font-semibold text-[#374151] mb-1">שינוי סיסמה</p>
              <p className="text-[13px] text-[#6b7280]">
                לשינוי סיסמה, צרו קשר דרך WhatsApp
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#f3f4f6] my-6" />

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border-2 border-red-200 text-red-500 font-semibold text-[14px] hover:bg-red-50 hover:border-red-300 transition-all"
            >
              <LogOut size={16} />
              יציאה מהחשבון
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
