import classNames from 'classnames/bind'
import styles from './Row.module.css'
const cx = classNames.bind(styles)

export enum ROW_TYPE {
  FULL_SCREEN = 'full-screen',
  NORMAL = 'normal',
}

interface Props {
  children?: React.ReactNode
  type?: ROW_TYPE
  isOnTop?: boolean
  style?: object
}

export default function Row({ children, type = ROW_TYPE.NORMAL, isOnTop = true, style }: Props) {
  return (
    <div className={cx(type, { top: isOnTop })} style={style ? style : {}}>
      {children}
    </div>
  )
}
