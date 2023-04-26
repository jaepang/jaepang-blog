'use client'

import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'
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

function calcCenterZoomTransform(width: number, height: number, imgProperty: DOMRect) {
  if (imgProperty) {
    const scale = Math.min(width / imgProperty.width, height / imgProperty.height)
    const translateY = -imgProperty.y + (height - imgProperty.height) / 2

    return `translateY(${translateY}px) scale(${scale})`
  }
  return 'none'
}

export function ImageBlock({ id, src, blurSrc, caption, size }: Props) {
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [imgProperty, setImgProperty] = useState<DOMRect>(null)
  const { width, height } = useWindowSize()
  const aspectRatio = size.width / size.height
  const transform = calcCenterZoomTransform(width, height, imgProperty)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => setIsZoomed(false))
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', () => setIsZoomed(false))
      }
    }
  }, [])

  useEffect(() => {
    if (document) {
      setImgProperty(document?.getElementById(id)?.getBoundingClientRect())
    }
  }, [id])

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
