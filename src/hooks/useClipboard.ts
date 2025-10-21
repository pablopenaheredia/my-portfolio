import { useState } from 'react'

interface UseClipboardReturn {
  copyToClipboard: (text: string) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  toastMessage: string;
}

/**
 * Custom hook for copying text to clipboard with toast notifications
 */
export function useClipboard(): UseClipboardReturn {
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  const copyToClipboard = (text: string): void => {
    const doShowSuccess = () => {
      setToastMessage('Email copiado en el portapapeles')
      setShowToast(true)
    }

    const doShowFail = () => {
      setToastMessage('No se pudo copiar el email')
      setShowToast(true)
    }

    // Modern clipboard API with fallback
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => doShowSuccess())
        .catch(() => doShowFail())
    } else {
      // Fallback for older browsers
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
