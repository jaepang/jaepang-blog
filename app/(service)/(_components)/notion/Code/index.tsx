'use client'

import style from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'
import { BiCopy } from 'react-icons/bi'

import { useState } from 'react'
import { useCode } from './useCode'

import classNames from 'classnames/bind'
import styles from './Code.module.css'
const cx = classNames.bind(styles)

interface Props {
  language: string
  children: string
}

export default function Code({ language, children }: Props) {
  const [copied, setCopied] = useState(false)
  const { SyntaxHighlighter, customStyle } = useCode()

  function copyToClipboard() {
    if (navigator?.clipboard) {
      try {
        navigator.clipboard.writeText(children)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1500)
      } catch (e) {
        window.alert('소스코드 복사에 실패했습니다. 다시 시도해주세요.')
      }
    }
  }

  return (
    <pre className={cx('root')}>
      <div className={cx('header')}>
        <span className={cx('language')}>{language}</span>
        <div className={cx('copy-wrapper', { 'click-available': !copied, copied: copied })} onClick={copyToClipboard}>
          <BiCopy />
          {copied ? 'copied' : 'copy'}
        </div>
      </div>
      <SyntaxHighlighter
        style={style}
        customStyle={customStyle}
        lineNumberStyle={{ minWidth: '2.8em' }}
        useInlineStyles={true}
        language={language.replace('++', 'pp')}>
        {children}
      </SyntaxHighlighter>
    </pre>
  )
}
