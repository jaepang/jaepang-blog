import { CSSProperties } from 'react'

import classNames from 'classnames/bind'
import styles from '@components/notion/Block/Block.module.css'
const cx = classNames.bind(styles)

export function Callout({ value, children }) {
  const { color } = value
  let style: CSSProperties

  if (color?.includes('background')) {
    style = {
      backgroundColor: `var(--color-bg-${color.slice(0, -11) ?? 'gray'})`,
    }
  } else {
    style = {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-light-gray-border)',
      color: `var(--color-text-${color}) !important`,
    }
  }

  return (
    <div className={cx('callout-body')} style={style}>
      {value?.icon?.emoji && <span className={cx('emoji')}>{value.icon.emoji}</span>}
      <div className={cx('text')}>{children}</div>
    </div>
  )
}
