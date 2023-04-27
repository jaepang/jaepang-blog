import { CSSProperties } from 'react'

import classNames from 'classnames/bind'
import styles from './Callout.module.css'
const cx = classNames.bind(styles)

export default function Callout({ value, children }) {
  const { color } = value
  const style: CSSProperties = color?.includes('background')
    ? {
        backgroundColor: `var(--color-bg-${color.slice(0, -11) ?? 'gray'})`,
      }
    : {
        backgroundColor: 'transparent',
        border: '1px solid var(--color-light-gray-border)',
        color: `var(--color-text-${color}) !important`,
      }

  return (
    <div className={cx('root')} style={style}>
      {value?.icon?.emoji && <span>{value.icon.emoji}</span>}
      <div>{children}</div>
    </div>
  )
}
