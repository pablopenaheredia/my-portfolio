import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface UseClipboardReturn {
  copyToClipboard: (text: string) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  toastMessage: string;
}

/**
 * Hook personalizado para copiar texto al portapapeles con notificaciones tipo toast
 */
export function useClipboard(): UseClipboardReturn {
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const { t } = useLanguage()

  const copyToClipboard = (text: string): void => {
    const doShowSuccess = () => {
      setToastMessage(t('clipboard.success'))
      setShowToast(true)
    }

    const doShowFail = () => {
      setToastMessage(t('clipboard.error'))
      setShowToast(true)
    }

  // API moderna del portapapeles con fallback
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => doShowSuccess())
        .catch(() => doShowFail())
    } else {
  // Fallback para navegadores antiguos
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        doShowSuccess()
      } catch (err) {
        doShowFail()
      }
    }
  }

  return { copyToClipboard, showToast, setShowToast, toastMessage }
}
