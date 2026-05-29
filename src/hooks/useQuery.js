import { useState, useEffect, useCallback, useRef } from 'react'

export function useQuery(queryFn) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fnRef = useRef(queryFn)

  useEffect(() => {
    fnRef.current = queryFn
  })

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fnRef.current()
      setData(result ?? [])
    } catch (err) {
      setError(err.message ?? 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { run() }, [run])

  return { data, loading, error, refetch: run }
}
