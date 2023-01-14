import Row from './shared/Row'
import Navbar from './shared/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Row>{children}</Row>
    </>
  )
}
