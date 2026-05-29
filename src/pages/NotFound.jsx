import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[58vh] text-center px-4">
      <div
        className="text-[96px] font-black leading-none mb-3 select-none"
        style={{ color: 'transparent', WebkitTextStroke: '2px #e2e8f0' }}
      >
        404
      </div>
      <h2 className="text-[18px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Page not found
      </h2>
      <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-7 max-w-xs leading-relaxed">
        The page you're looking for doesn't exist or has been removed.
      </p>
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 px-5 py-2.5 rounded-xl transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        Back to Dashboard
      </NavLink>
    </div>
  )
}
