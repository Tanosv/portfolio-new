import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  useEffect(() => {
    if (hash) return

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }, [pathname, search, hash, prefersReducedMotion])

  return null
}
