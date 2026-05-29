import { useState } from 'react'
import { useQuery } from '../hooks/useQuery'
import { getReviews, updateReviewStatus } from '../services/reviews'
import TableSkeleton from '../components/TableSkeleton'
import PageHeader from '../components/ui/PageHeader'
import MiniStat from '../components/ui/MiniStat'
import ErrorBanner from '../components/ui/ErrorBanner'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'

const statusStyles = {
  Published: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Hidden: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
}
const typeStyles = {
  Package: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Hotel: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400',
  Car: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { data, loading, error, refetch } = useQuery(getReviews)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const toast = useToast()

  const filtered = data.filter(r =>
    (r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.item.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || r.status === statusFilter)
  )

  const avgRating = data.length
    ? (data.reduce((sum, r) => sum + r.rating, 0) / data.length).toFixed(1)
    : '—'

  const handleStatus = async (id, status) => {
    try {
      await updateReviewStatus(id, status)
      toast(`Review ${status === 'Published' ? 'published' : 'hidden'} successfully.`, 'success')
      refetch()
    } catch {
      toast('Failed to update review. Please try again.', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reviews"
        description="Moderate and manage customer reviews"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total Reviews" value={data.length} color="text-blue-500" loading={loading} />
        <MiniStat label="Published" value={data.filter(r => r.status === 'Published').length} color="text-emerald-500" loading={loading} />
        <MiniStat label="Pending" value={data.filter(r => r.status === 'Pending').length} color="text-amber-500" loading={loading} />
        <MiniStat label="Avg Rating" value={avgRating === '—' ? avgRating : `${avgRating} ★`} color="text-amber-400" loading={loading} />
      </div>

      <ErrorBanner error={error} />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
            <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search reviews..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full" />
          </div>
          <div className="flex gap-1.5">
            {['All', 'Published', 'Pending', 'Hidden'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                {['ID', 'User', 'Type', 'Item', 'Rating', 'Comment', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading
              ? <TableSkeleton cols={9} rows={6} />
              : (
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {filtered.length === 0
                    ? <EmptyState message="No reviews match your filters." colSpan={9} />
                    : filtered.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">{r.id}</td>
                        <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">{r.user}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeStyles[r.type]}`}>{r.type}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.item}</td>
                        <td className="px-4 py-3.5"><Stars rating={r.rating} /></td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 max-w-xs">
                          <span className="line-clamp-1">{r.comment}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 dark:text-slate-500 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1">
                            <button onClick={() => handleStatus(r.id, 'Published')} title="Publish"
                              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </button>
                            <button onClick={() => handleStatus(r.id, 'Hidden')} title="Hide"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              )
            }
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700">
          <span className="text-[12px] text-slate-400 dark:text-slate-500">
            {loading ? 'Loading…' : `Showing ${filtered.length} of ${data.length} reviews`}
          </span>
        </div>
      </div>
    </div>
  )
}
