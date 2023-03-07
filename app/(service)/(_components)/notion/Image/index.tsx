'use client'

import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

import classNames from 'classnames/bind'
import styles from './Image.module.css'
const cx = classNames.bind(styles)

function calcCenterZoomTransform(
  width: number,
  height: number,
  imgProperty: { width: number; height: number; x: number; y: number },
) {
  const scale = Math.min(width / imgProperty.width, height / imgProperty.height)
  const translateY = -imgProperty.y + (height - imgProperty.height) / 2

  return `translateY(${translateY}px) scale(${scale})`
}

export default function ImageBlock({ id, src, caption }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [imgProperty, setImgProperty] = useState({
    width: 1,
    height: 1,
    x: 0,
    y: 0,
  })
  const { width, height } = useWindowSize()
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
      setImgProperty(document?.getElementById(id)?.getBoundingClientRect() ?? { width: 1, height: 1, x: 0, y: 0 })
    }
  }, [id])

  function handleClick() {
    if (document) {
      setImgProperty(document?.getElementById(id)?.getBoundingClientRect() ?? { width: 1, height: 1, x: 0, y: 0 })
    }
    setIsZoomed(prev => !prev)
  }

  return (
    <>
      <div className={cx('root', { zoom: isZoomed })} onClick={handleClick}>
        <figure className={cx('figure')}>
          <Image
            id={id}
            className={cx('image', { zoom: isZoomed })}
            src={src}
            alt={caption ?? ''}
            style={{
              transform: isZoomed ? transform : 'none',
            }}
            fill
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      </div>
      {isZoomed && <div className={cx('overlay')} onClick={handleClick} />}
    </>
  )
}
