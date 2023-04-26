import classNames from 'classnames/bind'
import { ElementType } from 'react'
import styles from './Row.module.css'
const cx = classNames.bind(styles)

export enum ROW_TYPE {
  FULL_SCREEN = 'full-screen',
  WIDE = 'wide',
  NORMAL = 'normal',
}

interface Props {
  as?: ElementType
  children?: React.ReactNode
  type?: ROW_TYPE
  isOnTop?: boolean
  style?: object
}

export default function Row({ as = 'div', children, type = ROW_TYPE.NORMAL, isOnTop = true, style }: Props) {
  const Component = as
  return (
    <Component className={cx(type, { top: isOnTop })} style={style ? style : {}}>
      {children}
    </Component>
  )
}
