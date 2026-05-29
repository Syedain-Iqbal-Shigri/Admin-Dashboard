import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

let _id = 0

const ICONS = {
  success: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
}

const STYLES = {
  success: 'bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
  error: 'bg-red-50 dark:bg-slate-800 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400',
  warning: 'bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400',
  info: 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400',
}

function ToastItem({ message, type, onDismiss }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-[13px] font-medium max-w-sm w-full pointer-events-auto ${STYLES[type]}`}
      style={{ animation: 'toastEnter 0.22s ease forwards' }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d={ICONS[type]} />
      </svg>
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="opacity-50 hover:opacity-100 transition-opacity shrink-0 ml-1">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((key) => {
    setToasts(prev => prev.filter(t => t.key !== key))
  }, [])

  const toast = useCallback((message, type = 'info') => {
    const key = ++_id
    setToasts(prev => [...prev, { key, message, type }])
    setTimeout(() => dismiss(key), 4000)
  }, [dismiss])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.key} {...t} onDismiss={() => dismiss(t.key)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
