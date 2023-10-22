
import { useEffect, useState } from 'react'

export function useFetchToken() {
    const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = window.localStorage.getItem('token')
    setToken(t)
  }, [])

  return token
}

// Logout component
export const logout = () => {
    window.localStorage.removeItem('token')
  }