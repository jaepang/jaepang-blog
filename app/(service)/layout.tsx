import Navbar from '@components/layout/Navbar'

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
