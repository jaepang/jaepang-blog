import Image from 'next/image'

import classNames from 'classnames/bind'
import styles from './OGImage.module.css'
const cx = classNames.bind(styles)

interface Props {
  title: string
  cover: string
  tags: {
    id: string
    name: string
    color: string
  }[]
}

export default function OGImage({ title, cover, tags }: Props) {
  return (
    <div className={cx('root')} style={{ background: cover ? `url(${cover})` : '#fff' }}>
      <div className={cx('container')}>
        <div className={cx('info')}>
          <div className={cx('title')}>{title}</div>
          <div className={cx('tags')}>
            {tags.map(tag => (
              <div key={tag.id} className={cx('tag')} style={{ backgroundColor: tag.color }}>
                {tag.name}
              </div>
            ))}
          </div>
        </div>
        <Image src="/logo/logo.png" alt="jaepang" fill sizes="100%" />
      </div>
    </div>
  )
}
