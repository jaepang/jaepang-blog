import { useState, useEffect } from 'react'

export function useImage(id: string) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [imgProperty, setImgProperty] = useState<DOMRect>(null)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => setIsZoomed(false))
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', () => setIsZoomed(false))
      }
    }
  }, [])

  useEffect(() => {
    if (document) {
      setImgProperty(document?.getElementById(id)?.getBoundingClientRect())
    }
  }, [id])

  return {
    isZoomed,
    setIsZoomed,
    imgProperty,
    setImgProperty,
  }
}
