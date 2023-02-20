'use client'

import { ThemeProvider } from 'next-themes'

export default function ThemeRootProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
