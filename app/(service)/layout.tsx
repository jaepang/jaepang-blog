import Navbar from '@components/Navbar'
import Row from '@components/Row'

import classNames from 'classnames/bind'
import styles from './layout.module.css'
const cx = classNames.bind(styles)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Row>{children}</Row>
    </>
  )
}
