import { X, Phone, MessageCircle } from 'lucide-react'

const PHONE_TEL = 'tel:0527090457'
const WHATSAPP_URL = 'https://wa.me/972527090457'

interface Props { onClose: () => void }

export default function PhoneContactModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xs"
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0f0f0]">
          <div>
            <h3 className="text-[17px] font-bold text-[#111827]">יצירת קשר</h3>
            <p className="text-[12px] text-[#9ca3af] mt-0.5">052-7090457</p>
          </div>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#374151] transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="p-5 flex flex-col gap-3">
          <a
            href={PHONE_TEL}
            onClick={onClose}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#dbeafe] hover:bg-[#bfdbfe] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#1e40af] flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#1e40af]">התקשרו</p>
              <p className="text-[12px] text-[#6b7280]">פתח חייגן</p>
            </div>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#d1fae5] hover:bg-[#a7f3d0] transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#059669] flex items-center justify-center flex-shrink-0">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#059669]">WhatsApp</p>
              <p className="text-[12px] text-[#6b7280]">פתח אפליקציה או WhatsApp Web</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
