'use client'

import classNames from 'classnames/bind'
import styles from './Image.module.css'
const cx = classNames.bind(styles)

export default function ImageBlock({ id, src, caption }) {
  return (
    <div className={cx('root')}>
      <figure className={cx('figure')}>
        {/** TODO: implement zoom */}
        <img id={id} className={cx('image')} src={src} alt={caption} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  )
}
