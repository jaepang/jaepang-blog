import Image from 'next/image'

import classNames from 'classnames/bind'
import styles from './Navbar.module.css'
const cx = classNames.bind(styles)

export default function Navbar() {
  return (
    <div className={cx('root')}>
      <div className={cx('logo-wrapper')}>
        <Image src="/logo/logo.png" alt="jaepang" fill />
      </div>
      <strong>jaepang</strong>
      {' dev'}
    </div>
  )
}
