import { createContext, useContext, useState, useCallback } from 'react'

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null)

  const confirm = useCallback((message, title = 'Confirm Action') => {
    return new Promise(resolve => {
      setState({ message, title, resolve })
    })
  }, [])

  const close = (result) => {
    state?.resolve(result)
    setState(null)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
          onClick={() => close(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-6 w-full max-w-sm"
            style={{ animation: 'toastEnter 0.18s ease forwards' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-11 h-11 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 mx-auto">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 text-center mb-2">{state.title}</h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 text-center mb-6 leading-relaxed">{state.message}</p>
            <div className="flex gap-3">
              <button
                onClick={() => close(false)}
                className="flex-1 text-[13px] font-medium px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => close(true)}
                className="flex-1 text-[13px] font-medium px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => useContext(ConfirmContext)
