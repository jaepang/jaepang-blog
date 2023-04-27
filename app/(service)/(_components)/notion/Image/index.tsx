'use client'

import Image from 'next/image'

import { useWindowSize } from '@hooks/useWindowSize'
import { useImage } from './useImage'
import { calcCenterZoomTransform } from '@shared/utils'
import { IMAGE_SIZES } from '@shared/consts'

import classNames from 'classnames/bind'
import styles from './Image.module.css'
const cx = classNames.bind(styles)

interface Props {
  id: string
  src: string
  blurSrc?: string
  caption?: string
  size: {
    width: number
    height: number
  }
}

export default function ImageBlock({ id, src, blurSrc, caption, size }: Props) {
  const { isZoomed, setIsZoomed, imgProperty, setImgProperty } = useImage(id)
  const { width, height } = useWindowSize()
  const aspectRatio = size.width / size.height
  const transform = calcCenterZoomTransform(width, height, imgProperty)

  function handleClick() {
    if (document) {
      setImgProperty(document?.getElementById(id)?.getBoundingClientRect())
    }
    setIsZoomed(prev => !prev)
  }

  return (
    <>
      <div className={cx('root', { zoom: isZoomed })} onClick={handleClick}>
        <figure className={cx('figure')} style={{ aspectRatio }}>
          <Image
            id={id}
            className={cx('image', { zoom: isZoomed })}
            src={src}
            alt={caption ?? ''}
            style={{
              transform: isZoomed ? transform : 'none',
            }}
            fill
            sizes={IMAGE_SIZES}
            placeholder={blurSrc ? 'blur' : 'empty'}
            blurDataURL={blurSrc}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      </div>
      {isZoomed && <div className={cx('overlay')} onClick={handleClick} />}
    </>
  )
}
