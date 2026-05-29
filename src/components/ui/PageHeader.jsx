export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        {description && (
          <p className="text-[12.5px] text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  )
}

export function AddButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      {label}
    </button>
  )
}
