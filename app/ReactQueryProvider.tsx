'use client'

import { QueryClientProvider } from "react-query"
import { queryClient } from './(shared)/react-query'

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}