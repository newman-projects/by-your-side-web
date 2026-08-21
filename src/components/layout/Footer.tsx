import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer dir="rtl">
      {/* Top wave */}
      <div className="bg-[#1e40af] overflow-hidden">
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="white" />
        </svg>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <img src="/logo.png" alt="לצדכם" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-white/70 text-[13px] leading-relaxed">
                מרכז לתמיכה מקצועית, סיוע נפשי, טיפול ושיקום לאבות גרושים וגברים נפגעי אלימות בישראל.
              </p>
              <div className="flex gap-3 mt-5">
                <a href="tel:0527090457"
                   className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone size={14} className="text-white" />
                </a>
                <a href="mailto:office.letsidchem@gmail.com"
                   className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail size={14} className="text-white" />
                </a>
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="text-white font-bold text-[12px] uppercase tracking-widest mb-5">ניווט</h4>
              <ul className="space-y-3">
                {[
                  { l: 'בית', h: '/' }, { l: 'אודות', h: '/about' },
                  { l: 'שירותים', h: '/services' }, { l: 'קהילה', h: '/community' },
                  { l: 'מאמרים', h: '/articles' },
                ].map(link => (
                  <li key={link.h}>
                    <Link to={link.h} className="text-white/65 hover:text-white text-[13px] transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-[12px] uppercase tracking-widest mb-5">תמיכה</h4>
              <ul className="space-y-3">
                {[
                  { l: 'צרו קשר', h: '/contact' }, { l: 'התנדבות', h: '/volunteer' },
                  { l: 'תרומה', h: '/donate' },
                ].map(link => (
                  <li key={link.h}>
                    <Link to={link.h} className="text-white/65 hover:text-white text-[13px] transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-[12px] uppercase tracking-widest mb-5">צרו קשר</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:0527090457" className="flex items-center gap-2.5 text-white/65 hover:text-white text-[13px] transition-colors">
                    <Phone size={13} className="flex-shrink-0" />052-7090457
                  </a>
                </li>
                <li>
                  <a href="mailto:office.letsidchem@gmail.com" className="flex items-start gap-2.5 text-white/65 hover:text-white text-[13px] transition-colors">
                    <Mail size={13} className="flex-shrink-0 mt-0.5" />office.letsidchem@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2.5 text-white/65 text-[13px]">
                    <MapPin size={13} className="flex-shrink-0 mt-0.5" />
                    <span>מצדה 9, בני ברק<br />ראשון לציון | ירושלים | תל אביב</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2.5 text-white/65 text-[13px]">
                    <Clock size={13} className="flex-shrink-0" />א׳–ה׳, 08:30–14:30
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-[11px]">© {new Date().getFullYear()} לצדכם. כל הזכויות שמורות.</p>
            <p className="text-white/40 text-[11px]">
              <a href="https://www.byourside.org" target="_blank" rel="noopener noreferrer"
                 className="hover:text-white/70 transition-colors">
                www.byourside.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
