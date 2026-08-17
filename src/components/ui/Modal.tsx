import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function Modal({ open, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const sizeClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }[size]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        className={`relative w-full ${sizeClass} bg-white rounded-3xl shadow-2xl animate-fade-up overflow-hidden`}
        dir="rtl"
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <h2 className="text-[19px] font-semibold text-[#1d1d1f]">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f5f5f7] transition-colors"
            >
              <X size={16} className="text-[#86868b]" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#f5f5f7] transition-colors z-10"
          >
            <X size={16} className="text-[#86868b]" />
          </button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
