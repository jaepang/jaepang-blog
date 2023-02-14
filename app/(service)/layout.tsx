import Row, { ROW_TYPE } from '@components/layout/Row'
import Navbar from '@components/layout/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Row type={ROW_TYPE.FULL_SCREEN}>{children}</Row>
    </>
  )
}
