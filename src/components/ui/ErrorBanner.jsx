export default function ErrorBanner({ error }) {
  if (!error) return null
  return (
    <div className="flex items-center gap-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-[13px] px-4 py-3 rounded-xl">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <span>{error}</span>
    </div>
  )
}
