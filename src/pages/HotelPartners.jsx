import { useState } from 'react'
import { useQuery } from '../hooks/useQuery'
import { getHotelPartners, deleteHotelPartner } from '../services/hotelPartners'
import TableSkeleton from '../components/TableSkeleton'
import PageHeader, { AddButton } from '../components/ui/PageHeader'
import MiniStat from '../components/ui/MiniStat'
import ErrorBanner from '../components/ui/ErrorBanner'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { useConfirm } from '../components/ui/ConfirmModal'

const statusStyles = {
  Active: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Inactive: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
  Pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
}

export default function HotelPartners() {
  const { data, loading, error, refetch } = useQuery(getHotelPartners)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const toast = useToast()
  const confirm = useConfirm()

  const filtered = data.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || p.status === statusFilter)
  )

  const active = data.filter(p => p.status === 'Active').length
  const totalHotels = data.filter(p => p.status === 'Active').reduce((sum, p) => sum + p.hotels, 0)
  const avgCommission = data.length
    ? (data.reduce((sum, p) => sum + p.commission, 0) / data.length).toFixed(1)
    : '—'

  const handleDelete = async (id) => {
    const ok = await confirm('Remove this partner? This cannot be undone.', 'Remove Partner')
    if (!ok) return
    try {
      await deleteHotelPartner(id)
      toast('Partner removed successfully.', 'success')
      refetch()
    } catch {
      toast('Failed to remove partner. Please try again.', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Hotel Partners"
        description="Manage hotel partner relationships and agreements"
        action={<AddButton label="Add Partner" />}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total Partners" value={data.length} color="text-blue-500" loading={loading} />
        <MiniStat label="Active" value={active} color="text-emerald-500" loading={loading} />
        <MiniStat label="Hotels Listed" value={totalHotels} color="text-violet-500" loading={loading} />
        <MiniStat label="Avg Commission" value={avgCommission === '—' ? avgCommission : `${avgCommission}%`} color="text-amber-500" loading={loading} />
      </div>

      <ErrorBanner error={error} />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
            <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search partners..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full" />
          </div>
          <div className="flex gap-1.5">
            {['All', 'Active', 'Inactive', 'Pending'].map(s => (
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
                {['ID', 'Partner', 'Contact', 'Phone', 'Hotels', 'Commission', 'City', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading
              ? <TableSkeleton cols={10} rows={6} />
              : (
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {filtered.length === 0
                    ? <EmptyState message="No partners match your filters." colSpan={10} />
                    : filtered.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">{p.id}</td>
                        <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">{p.name}</td>
                        <td className="px-4 py-3.5 text-blue-500 dark:text-blue-400 text-[12px]">{p.contact}</td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 text-[12px] whitespace-nowrap">{p.phone}</td>
                        <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-200 text-center">{p.hotels}</td>
                        <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-200">{p.commission}%</td>
                        <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">{p.city}</td>
                        <td className="px-4 py-3.5 text-slate-400 dark:text-slate-500 whitespace-nowrap">{p.join_date}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Edit">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(p.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Remove">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
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
            {loading ? 'Loading…' : `Showing ${filtered.length} of ${data.length} partners`}
          </span>
        </div>
      </div>
    </div>
  )
}
