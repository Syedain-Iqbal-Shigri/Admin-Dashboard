import { useState } from 'react'
import { useQuery } from '../hooks/useQuery'
import { getCustomPackageRequests, updateRequestStatus } from '../services/customPackages'
import TableSkeleton from '../components/TableSkeleton'
import PageHeader from '../components/ui/PageHeader'
import MiniStat from '../components/ui/MiniStat'
import ErrorBanner from '../components/ui/ErrorBanner'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'

const statusStyles = {
  Pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'In Review': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Approved: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Rejected: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function CustomPackages() {
  const { data, loading, error, refetch } = useQuery(getCustomPackageRequests)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const toast = useToast()

  const filtered = data.filter(r =>
    (r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.destination.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || r.status === statusFilter)
  )

  const handleStatus = async (id, status) => {
    try {
      await updateRequestStatus(id, status)
      toast(`Request marked as ${status}.`, 'success')
      refetch()
    } catch {
      toast('Failed to update request. Please try again.', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Custom Packages"
        description="Review and manage custom package requests"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total" value={data.length} color="text-blue-500" loading={loading} />
        <MiniStat label="Pending" value={data.filter(r => r.status === 'Pending').length} color="text-amber-500" loading={loading} />
        <MiniStat label="In Review" value={data.filter(r => r.status === 'In Review').length} color="text-blue-400" loading={loading} />
        <MiniStat label="Approved" value={data.filter(r => r.status === 'Approved').length} color="text-emerald-500" loading={loading} />
      </div>

      <ErrorBanner error={error} />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
            <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Pending', 'In Review', 'Approved', 'Rejected'].map(s => (
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
                {['ID', 'User', 'Destination', 'Activities', 'Budget', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading
              ? <TableSkeleton cols={8} rows={6} />
              : (
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {filtered.length === 0
                    ? <EmptyState message="No requests match your filters." colSpan={8} />
                    : filtered.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">{r.id}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-medium text-slate-800 dark:text-slate-100">{r.user}</div>
                          <div className="text-[11.5px] text-slate-400 dark:text-slate-500">{r.email}</div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.destination}</td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 max-w-40 truncate">{r.activities}</td>
                        <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-100">${r.budget.toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-slate-400 dark:text-slate-500 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1">
                            <button onClick={() => handleStatus(r.id, 'Approved')} title="Approve"
                              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            </button>
                            <button onClick={() => handleStatus(r.id, 'In Review')} title="Mark In Review"
                              className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                            </button>
                            <button onClick={() => handleStatus(r.id, 'Rejected')} title="Reject"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
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
            {loading ? 'Loading…' : `Showing ${filtered.length} of ${data.length} requests`}
          </span>
        </div>
      </div>
    </div>
  )
}
