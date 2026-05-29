import { useState } from 'react'
import { useQuery } from '../hooks/useQuery'
import { getBookings, deleteBooking } from '../services/bookings'
import TableSkeleton from '../components/TableSkeleton'
import PageHeader from '../components/ui/PageHeader'
import MiniStat from '../components/ui/MiniStat'
import ErrorBanner from '../components/ui/ErrorBanner'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { useConfirm } from '../components/ui/ConfirmModal'

const statusStyles = {
  Confirmed: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Cancelled: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
}
const typeStyles = {
  Package: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Hotel: 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400',
  Car: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
}

export default function Bookings() {
  const { data, loading, error, refetch } = useQuery(getBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const toast = useToast()
  const confirm = useConfirm()

  const filtered = data.filter(b =>
    (b.user.toLowerCase().includes(search.toLowerCase()) ||
      b.item.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || b.status === statusFilter) &&
    (typeFilter === 'All' || b.type === typeFilter)
  )

  const confirmed = data.filter(b => b.status === 'Confirmed').length
  const revenue = data.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.amount, 0)

  const handleDelete = async (id) => {
    const ok = await confirm('Delete this booking? This cannot be undone.', 'Delete Booking')
    if (!ok) return
    try {
      await deleteBooking(id)
      toast('Booking deleted successfully.', 'success')
      refetch()
    } catch {
      toast('Failed to delete booking. Please try again.', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bookings"
        description="All customer bookings across packages, hotels, and cars"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total Bookings" value={data.length} color="text-blue-500" loading={loading} />
        <MiniStat label="Confirmed" value={confirmed} color="text-emerald-500" loading={loading} />
        <MiniStat label="Pending" value={data.filter(b => b.status === 'Pending').length} color="text-amber-500" loading={loading} />
        <MiniStat label="Revenue" value={`$${revenue.toLocaleString()}`} color="text-violet-500" loading={loading} />
      </div>

      <ErrorBanner error={error} />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
            <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Confirmed', 'Pending', 'Cancelled'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                {s}
              </button>
            ))}
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-600 self-center" />
            {['All', 'Package', 'Hotel', 'Car'].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors ${typeFilter === t ? 'bg-slate-700 dark:bg-slate-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                {['ID', 'Customer', 'Type', 'Item', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading
              ? <TableSkeleton cols={8} rows={8} />
              : (
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {filtered.length === 0
                    ? <EmptyState message="No bookings match your filters." colSpan={8} />
                    : filtered.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">{b.id}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">{b.user}</div>
                          <div className="text-[11.5px] text-slate-400 dark:text-slate-500">{b.email}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeStyles[b.type]}`}>{b.type}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">{b.item}</td>
                        <td className="px-4 py-3.5 text-slate-400 dark:text-slate-500 whitespace-nowrap">{b.date}</td>
                        <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-100">${b.amount.toLocaleString()}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[b.status]}`}>{b.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button onClick={() => handleDelete(b.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Delete">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                          </button>
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
            {loading ? 'Loading…' : `Showing ${filtered.length} of ${data.length} bookings`}
          </span>
        </div>
      </div>
    </div>
  )
}
