import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import {
  Users, TrendingUp, Heart, BookOpen,
  Search, Trash2, Shield, Loader2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { adminApi, type AdminUser } from '../api/admin'

// ─── helpers ────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatILS(n: number) {
  return '₪' + n.toLocaleString('he-IL')
}

// ─── pure-CSS bar chart ──────────────────────────────────────────────────────

interface BarChartProps {
  data: { month: string; value: number }[]
  color: string
}

function BarChart({ data, color }: BarChartProps) {
  const last6 = data.slice(-6)
  const max = Math.max(...last6.map(d => d.value), 1)

  return (
    <div className="flex items-end gap-2 h-28 w-full">
      {last6.map((d) => {
        const pct = Math.round((d.value / max) * 100)
        return (
          <div key={d.month} className="flex flex-col items-center flex-1 gap-1 h-full justify-end">
            <span className="text-[10px] text-[#6b7280] font-medium leading-none">
              {d.value > 0 ? d.value : ''}
            </span>
            <div
              className={`w-full rounded-t-lg ${color} transition-all`}
              style={{ height: `${Math.max(pct, 4)}%` }}
            />
            <span className="text-[9px] text-[#9ca3af] leading-none whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center">
              {d.month}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#e5e7eb] px-5 py-4 flex flex-col gap-2 shadow-sm">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <p className="text-[28px] font-black text-[#1e1b4b] leading-none">{value}</p>
      <p className="text-[13px] text-[#6b7280]">{label}</p>
    </div>
  )
}

// ─── user row ─────────────────────────────────────────────────────────────────

interface UserRowProps {
  user: AdminUser
  currentUserId: string | undefined
  onToggleAdmin: (id: string) => void
  onDelete: (id: string) => void
  isTogglingAdmin: boolean
  isDeletingUser: boolean
  pendingToggleId: string | null
  pendingDeleteId: string | null
}

function UserRow({
  user,
  currentUserId,
  onToggleAdmin,
  onDelete,
  isTogglingAdmin,
  isDeletingUser,
  pendingToggleId,
  pendingDeleteId,
}: UserRowProps) {
  const isSelf = user.id === currentUserId
  const isToggling = isTogglingAdmin && pendingToggleId === user.id
  const isDeleting = isDeletingUser && pendingDeleteId === user.id

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8FAFF] transition-colors border-b border-[#f3f4f6] last:border-0">
      {/* Avatar */}
      <div className="shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] text-[#4338ca] flex items-center justify-center text-[13px] font-bold select-none">
        {user.avatar_url
          ? <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
          : initials(user.full_name || user.email)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[14px] font-semibold text-[#1e1b4b] truncate">{user.full_name}</span>
          {user.is_admin && (
            <span className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#4338ca] text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Shield size={9} /> מנהל
            </span>
          )}
          {user.is_verified && (
            <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              מאומת
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#6b7280] truncate mt-0.5">{user.email}</p>
        <p className="text-[11px] text-[#9ca3af] mt-0.5">{formatDate(user.created_at)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onToggleAdmin(user.id)}
          disabled={isSelf || isToggling}
          title={isSelf ? 'לא ניתן לשנות את עצמך' : user.is_admin ? 'הסר מנהל' : 'הפוך לאדמין'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold
            border border-[#e5e7eb] text-[#374151] bg-white hover:bg-[#F8FAFF] transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isToggling
            ? <Loader2 size={12} className="animate-spin" />
            : <Shield size={12} />}
          {user.is_admin ? 'הסר מנהל' : 'הפוך לאדמין'}
        </button>

        <button
          onClick={() => onDelete(user.id)}
          disabled={isSelf || isDeleting}
          title={isSelf ? 'לא ניתן למחוק את עצמך' : 'מחק משתמש'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold
            border border-red-100 text-red-500 bg-white hover:bg-red-50 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isDeleting
            ? <Loader2 size={12} className="animate-spin" />
            : <Trash2 size={12} />}
          מחק
        </button>
      </div>
    </div>
  )
}

// ─── tabs ─────────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'users' | 'grants'
const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'סקירה כללית' },
  { id: 'users', label: 'משתמשים' },
  { id: 'grants', label: 'מענקים' },
]

// ─── main page ────────────────────────────────────────────────────────────────

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [search, setSearch] = useState('')
  const [pendingToggleId, setPendingToggleId] = useState<string | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  // ── auth guard ──────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#1e40af]" />
      </div>
    )
  }

  if (!isAdmin) {
    navigate('/login')
    return null
  }

  // ── queries ─────────────────────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['admin', 'summary'],
    queryFn: adminApi.summary,
    enabled: isAdmin,
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: usersPerMonth = [] } = useQuery({
    queryKey: ['admin', 'usersPerMonth'],
    queryFn: adminApi.usersPerMonth,
    enabled: isAdmin && activeTab === 'overview',
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: donationsRevenue = [] } = useQuery({
    queryKey: ['admin', 'donationsRevenue'],
    queryFn: adminApi.donationsRevenue,
    enabled: isAdmin && activeTab === 'overview',
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: servicesRevenue = [] } = useQuery({
    queryKey: ['admin', 'servicesRevenue'],
    queryFn: adminApi.servicesRevenue,
    enabled: isAdmin && activeTab === 'overview',
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin', 'users', search],
    queryFn: () => adminApi.listUsers({ search: search || undefined, limit: 100 }),
    enabled: isAdmin && activeTab === 'users',
  })

  // ── combined revenue chart ───────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const combinedRevenue = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of donationsRevenue) map.set(p.month, (map.get(p.month) ?? 0) + p.value)
    for (const p of servicesRevenue) map.set(p.month, (map.get(p.month) ?? 0) + p.value)
    return Array.from(map.entries()).map(([month, value]) => ({ month, value }))
  }, [donationsRevenue, servicesRevenue])

  // ── mutations ────────────────────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: toggleAdmin, isPending: isTogglingAdmin } = useMutation({
    mutationFn: (id: string) => adminApi.toggleAdmin(id),
    onMutate: (id) => setPendingToggleId(id),
    onSettled: () => {
      setPendingToggleId(null)
      qc.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onMutate: (id) => setPendingDeleteId(id),
    onSettled: () => {
      setPendingDeleteId(null)
      qc.invalidateQueries({ queryKey: ['admin', 'users'] })
      qc.invalidateQueries({ queryKey: ['admin', 'summary'] })
    },
  })

  function handleDelete(id: string) {
    if (window.confirm('למחוק משתמש זה לצמיתות?')) {
      deleteUser(id)
    }
  }

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFF] px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-7">
          <h1 className="text-[28px] font-black text-[#1e1b4b]">פאנל ניהול</h1>
          <p className="text-[13px] text-[#6b7280] mt-1">ניהול מערכת By Your Side</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 bg-[#EEF2FF]/60 p-1.5 rounded-2xl w-fit mb-7">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl text-[14px] font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#1e1b4b] shadow-sm'
                  : 'text-[#6b7280] hover:text-[#374151]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Overview ──────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Stat cards */}
            {summaryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-3xl border border-[#e5e7eb] h-28 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  icon={<Users size={18} className="text-[#4338ca]" />}
                  label="סה״כ משתמשים"
                  value={summary?.total_users ?? 0}
                  color="bg-[#EEF2FF]"
                />
                <StatCard
                  icon={<TrendingUp size={18} className="text-green-600" />}
                  label="סה״כ הכנסות"
                  value={formatILS(summary?.total_revenue ?? 0)}
                  color="bg-green-50"
                />
                <StatCard
                  icon={<Heart size={18} className="text-rose-500" />}
                  label="מתנדבים פעילים"
                  value={summary?.active_volunteers ?? 0}
                  color="bg-rose-50"
                />
                <StatCard
                  icon={<BookOpen size={18} className="text-amber-600" />}
                  label="מאמרים"
                  value={summary?.total_articles ?? 0}
                  color="bg-amber-50"
                />
              </div>
            )}

            {/* Charts row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Users per month */}
              <div className="bg-white rounded-3xl border border-[#e5e7eb] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={15} className="text-[#4338ca]" />
                  <h3 className="text-[14px] font-bold text-[#1e1b4b]">משתמשים חדשים לחודש</h3>
                </div>
                {usersPerMonth.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-[#9ca3af] text-[13px]">
                    אין נתונים
                  </div>
                ) : (
                  <BarChart data={usersPerMonth} color="bg-[#818cf8]" />
                )}
              </div>

              {/* Revenue per month */}
              <div className="bg-white rounded-3xl border border-[#e5e7eb] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={15} className="text-green-600" />
                  <h3 className="text-[14px] font-bold text-[#1e1b4b]">הכנסות לחודש</h3>
                  <span className="text-[11px] text-[#9ca3af] mr-auto">תרומות + שירותים</span>
                </div>
                {combinedRevenue.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-[#9ca3af] text-[13px]">
                    אין נתונים
                  </div>
                ) : (
                  <BarChart data={combinedRevenue} color="bg-green-400" />
                )}
              </div>

            </div>
          </div>
        )}

        {/* ── Tab: Users ────────────────────────────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="space-y-4">

            {/* Search */}
            <div className="relative max-w-sm">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="חיפוש לפי שם או מייל..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-[#e5e7eb] rounded-xl pr-9 pl-4 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af] shadow-sm"
              />
            </div>

            {/* Users list */}
            <div className="bg-white rounded-3xl border border-[#e5e7eb] overflow-hidden shadow-sm">
              {usersLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={28} className="animate-spin text-[#1e40af]" />
                </div>
              ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#9ca3af]">
                  <Users size={32} className="mb-3 opacity-30" />
                  <p className="text-[15px]">לא נמצאו משתמשים</p>
                </div>
              ) : (
                <div>
                  {/* Header */}
                  <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#f3f4f6] flex items-center">
                    <span className="text-[12px] font-semibold text-[#6b7280]">
                      {users.length} משתמשים
                    </span>
                  </div>
                  {users.map((u: AdminUser) => (
                    <UserRow
                      key={u.id}
                      user={u}
                      currentUserId={user?.id}
                      onToggleAdmin={toggleAdmin}
                      onDelete={handleDelete}
                      isTogglingAdmin={isTogglingAdmin}
                      isDeletingUser={isDeletingUser}
                      pendingToggleId={pendingToggleId}
                      pendingDeleteId={pendingDeleteId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Grants ───────────────────────────────────────────────────── */}
        {activeTab === 'grants' && (
          <div className="max-w-md">
            <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 shadow-sm flex flex-col items-center text-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
                <BookOpen size={24} className="text-[#4338ca]" />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-[#1e1b4b] mb-1">ניהול מענקים</h2>
                <p className="text-[13px] text-[#6b7280] leading-relaxed">
                  לניהול מענקים פוטנציאליים, סריקה ידנית, עדכון סטטוס וטיוטות בקשה
                </p>
              </div>
              <Link
                to="/admin/grants"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1e40af] text-white font-bold text-[14px] hover:bg-[#1c3a9e] transition-colors shadow-sm"
              >
                עבור לניהול מענקים
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
