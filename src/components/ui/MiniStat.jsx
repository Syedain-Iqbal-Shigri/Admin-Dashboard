export default function MiniStat({ label, value, color, loading }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wide">
        {label}
      </div>
      {loading ? (
        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-700 rounded-md animate-pulse mt-1" />
      ) : (
        <div className={`text-[26px] font-bold leading-none ${color}`}>{value}</div>
      )}
    </div>
  )
}
