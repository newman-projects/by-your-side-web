import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/5 mt-24" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#0071e3] flex items-center justify-center">
                <span className="text-white font-bold text-sm">BY</span>
              </div>
              <span className="font-semibold text-[#1d1d1f] text-lg">לצדכם</span>
            </div>
            <p className="text-[#86868b] text-[13px] leading-relaxed">
              מרכז לתמיכה מקצועית, סיוע נפשי, טיפול ושיקום גברים נפגעי אלימות ואבות גרושים.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[13px] mb-4 uppercase tracking-wider">ניווט</h4>
            <ul className="space-y-3">
              {[
                { label: 'בית', href: '/' },
                { label: 'אודות', href: '/about' },
                { label: 'שירותים', href: '/services' },
                { label: 'קהילה', href: '/community' },
                { label: 'מאמרים', href: '/articles' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[13px] mb-4 uppercase tracking-wider">תמיכה</h4>
            <ul className="space-y-3">
              {[
                { label: 'צרו קשר', href: '/contact' },
                { label: 'התנדבות', href: '/volunteer' },
                { label: 'תרומה', href: '/donate' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[13px] mb-4 uppercase tracking-wider">פרטי קשר</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0527090457" className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors">
                  <Phone size={13} />
                  052-7090457
                </a>
              </li>
              <li>
                <a href="mailto:office.letsidchem@gmail.com" className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] text-[13px] transition-colors">
                  <Mail size={13} />
                  office.letsidchem@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-[#86868b] text-[13px]">
                  <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                  <span>מצדה 9, בני ברק<br />ראשון לציון | ירושלים | תל אביב</span>
                </div>
              </li>
              <li>
                <a
                  href="https://www.byourside.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#86868b] hover:text-[#0071e3] text-[13px] transition-colors"
                >
                  <ExternalLink size={12} />
                  byourside.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#86868b] text-[12px]">
            © {new Date().getFullYear()} לצדכם. כל הזכויות שמורות.
          </p>
          <p className="text-[#86868b] text-[12px]">
            שעות פעילות: ראשון–חמישי, 08:30–14:30
          </p>
        </div>
      </div>
    </footer>
  )
}
