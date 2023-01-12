import Navbar from './(_components)/Navbar'
import classNames from 'classnames/bind'
import styles from './layout.module.css'
const cx = classNames.bind(styles)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className={cx('contents-wrapper')}>{children}</div>
    </>
  )
}
