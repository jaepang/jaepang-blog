import Row from '@components/layout/Row'
import Navbar from '@components/layout/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Row>{children}</Row>
    </>
  )
}
