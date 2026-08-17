import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'בית', href: '/' },
  { label: 'אודות', href: '/about' },
  { label: 'שירותים', href: '/services' },
  { label: 'קהילה', href: '/community' },
  { label: 'מאמרים', href: '/articles' },
  { label: 'התנדבות', href: '/volunteer' },
  { label: 'צרו קשר', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
    setProfileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
          : 'bg-white/60 backdrop-blur-md'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0071e3] flex items-center justify-center">
              <span className="text-white font-bold text-sm">BY</span>
            </div>
            <span className="font-semibold text-[#1d1d1f] text-[15px] tracking-tight">
              לצדכם
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-[#0071e3]'
                    : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <User size={14} className="text-[#1d1d1f]" />
                  )}
                  <span className="text-[13px] font-medium text-[#1d1d1f] max-w-[100px] truncate hidden sm:block">
                    {user.full_name.split(' ')[0]}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
                    <div className="p-3 border-b border-black/5">
                      <p className="text-[13px] font-medium text-[#1d1d1f]">{user.full_name}</p>
                      <p className="text-[12px] text-[#86868b] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} />
                      התנתק
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block text-[13px] font-medium text-[#0071e3] hover:text-[#0077ed] px-3 py-1.5 transition-colors"
                >
                  כניסה
                </Link>
                <Link
                  to="/donate"
                  className="apple-btn apple-btn-primary text-[13px] py-1.5 px-4"
                >
                  תרומה
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[#f5f5f7] transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" dir="rtl">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-[#0071e3]/10 text-[#0071e3]'
                    : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                className="mt-2 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#0071e3] hover:bg-[#f5f5f7] transition-colors"
              >
                כניסה לחשבון
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
