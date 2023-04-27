import { CSSProperties, ElementType } from 'react'

import classNames from 'classnames/bind'
import styles from './Row.module.css'
const cx = classNames.bind(styles)

export enum ROW_TYPE {
  FULL_SCREEN = 'full-screen',
  WIDE = 'wide',
  NORMAL = 'normal',
}

interface Props {
  as?: ElementType
  type?: ROW_TYPE
  children?: React.ReactNode
  style?: CSSProperties
}

export default function Row({ as, children, type, style }: Props) {
  const Component = as ?? 'div'
  return (
    <Component className={cx('root', type ?? ROW_TYPE.NORMAL)} style={style ?? {}}>
      {children}
    </Component>
  )
}
