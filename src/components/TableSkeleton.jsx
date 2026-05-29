const widths = [40, 65, 55, 70, 45, 60, 50, 40, 30]

export default function TableSkeleton({ cols = 5, rows = 7 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-slate-50 dark:border-slate-700/50">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3.5">
              <div
                className="h-3.5 bg-slate-100 dark:bg-slate-700/60 rounded-md animate-pulse"
                style={{ width: `${widths[(i + j) % widths.length]}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
