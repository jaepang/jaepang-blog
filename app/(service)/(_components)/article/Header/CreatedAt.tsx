'use client'

import { useState, useEffect } from 'react'

import classNames from 'classnames/bind'
import styles from './Header.module.css'
const cx = classNames.bind(styles)

export default function CreatedAt({ createdTime }) {
  const [language, setLanguage] = useState('ko-kr')

  useEffect(() => {
    console.log(navigator)
    navigator && setLanguage(navigator.language ?? 'ko-kr')
  }, [])

  return (
    <div className={cx('created-at')}>
      {new Date(createdTime).toLocaleString(language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </div>
  )
}
