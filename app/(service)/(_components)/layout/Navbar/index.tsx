import Image from 'next/image'
import Link from 'next/link'

import classNames from 'classnames/bind'
import styles from './Navbar.module.css'
const cx = classNames.bind(styles)

export default function Navbar() {
  return (
    <nav className={cx('root')}>
      <Link href="/" className={cx('home-link')}>
        <div className={cx('logo-wrapper')}>
          <Image src="/logo/logo.png" alt="jaepang" fill sizes="100%" />
        </div>
        <strong>jaepang</strong>
        {' dev'}
      </Link>
    </nav>
  )
}
