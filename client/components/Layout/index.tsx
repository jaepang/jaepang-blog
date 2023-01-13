import Row from '@components/Layout/shared/Row'
import Navbar from '@root/client/components/Layout/shared/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Row>{children}</Row>
    </>
  )
}
