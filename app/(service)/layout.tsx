import Row, { ROW_TYPE } from '@components/layout/Row'
import Navbar from '@components/layout/Navbar'

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
