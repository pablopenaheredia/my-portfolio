// componente de notificacion temporal tipo toast
import { useEffect } from 'react'

interface ToastProps {
  message?: string;
  show?: boolean;
  timeout?: number;
  onClose?: () => void;
}

export default function Toast({ message = '', show = false, timeout = 2400, onClose = () => {} }: ToastProps) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => onClose(), timeout)
    return () => clearTimeout(t)
  }, [show, timeout, onClose])

  return (
    <div aria-live="polite" className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50">
      <div className={`${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-300 bg-color-800 text-color-100 px-4 py-2 rounded shadow-lg`}>
        {message}
      </div>
    </div>
  )
}
