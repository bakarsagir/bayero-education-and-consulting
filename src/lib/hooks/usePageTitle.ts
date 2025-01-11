import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${title} | Bayero Education`
    
    return () => {
      document.title = previousTitle
    }
  }, [title])
}