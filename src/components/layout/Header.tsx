import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, ChevronDown } from 'lucide-react'
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
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setProfileOpen(false) }, [location.pathname])

  const handleLogout = () => { logout(); navigate('/'); setProfileOpen(false) }

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-black/6 shadow-[0_1px_16px_rgba(0,0,0,0.07)]'
          : 'bg-transparent'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="לצדכם" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#1e40af]'
                    : scrolled
                    ? 'text-[#1f2937] hover:text-[#1e40af] hover:bg-[#F8FAFF]'
                    : 'text-[#1f2937] hover:text-[#1e40af] hover:bg-white/50'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0.5 right-1/2 translate-x-1/2 w-1 h-1 rounded-full bg-[#1e40af]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFF] border border-[#dbeafe] hover:border-[#1e40af]/30 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1e40af] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="text-[13px] font-medium text-[#1f2937] max-w-[90px] truncate hidden sm:block">
                    {user.full_name.split(' ')[0]}
                  </span>
                  <ChevronDown size={13} className={`text-[#6b7280] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-black/6 overflow-hidden anim-fade-in">
                    <div className="p-4 bg-[#F8FAFF] border-b border-black/5">
                      <p className="text-[13px] font-semibold text-[#111827]">{user.full_name}</p>
                      <p className="text-[11px] text-[#6b7280] truncate mt-0.5">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <a
                        href="/court-rulings"
                        className="flex items-center gap-2.5 w-full px-4 py-3 text-[13px] text-[#1e40af] hover:bg-[#F0F4FF] transition-colors font-medium border-b border-black/5"
                      >
                        פסיקות בית משפט
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-4 py-3 text-[13px] text-red-500 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut size={14} />
                      התנתקות
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block text-[13.5px] font-semibold text-[#1e40af] hover:text-[#1c3a9e] px-3 py-2 rounded-xl hover:bg-[#F8FAFF] transition-colors"
                >
                  כניסה
                </Link>
                <Link to="/donate" className="btn btn-orange btn-sm">
                  תרמו עכשיו
                </Link>
              </>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-[#F8FAFF] transition-colors"
            >
              {menuOpen
                ? <X size={20} className="text-[#1f2937]" />
                : <Menu size={20} className="text-[#1f2937]" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-black/6 shadow-xl anim-fade-in">
          <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1" dir="rtl">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#dbeafe] text-[#1e40af]'
                    : 'text-[#1f2937] hover:bg-[#F8FAFF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-black/5 mt-2 pt-3 flex gap-2">
              {!user && (
                <Link to="/login" className="btn btn-outline btn-sm flex-1">כניסה</Link>
              )}
              <Link to="/donate" className="btn btn-orange btn-sm flex-1">תרמו</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
