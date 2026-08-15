import { useEffect, useState } from 'react'
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => { try { const saved = window.localStorage.getItem(key); return saved ? JSON.parse(saved) as T : initialValue } catch { return initialValue } })
  useEffect(() => { try { const saved = window.localStorage.getItem(key); setValue(saved ? JSON.parse(saved) as T : initialValue) } catch { setValue(initialValue) } }, [key])
  const setStored = (next: T | ((current: T) => T)) => setValue((current) => { const resolved = next instanceof Function ? next(current) : next; window.localStorage.setItem(key, JSON.stringify(resolved)); return resolved })
  return [value, setStored] as const
}
