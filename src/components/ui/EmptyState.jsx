export default function EmptyState({ message = 'No results found.', colSpan = 6 }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400 dark:text-slate-500">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{message}</p>
        </div>
      </td>
    </tr>
  )
}
