'use client'

import style from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'

import { useState } from 'react'
import { useCode } from './useCode'

import classNames from 'classnames/bind'
import styles from './Code.module.css'
const cx = classNames.bind(styles)

const styleSkeleton = {
  marginBottom: '0',
  padding: '0.9em 0',
  fontSize: '1.5em', // set padding size; default: 1em
  lineHeight: '0',
  borderRadius: 'var(--border-radius)',
}

interface Props {
  language: string
  children: string
}

export default function Code({ language, children }: Props) {
  const [copied, setCopied] = useState(false)
  const { SyntaxHighlighter, isMobile } = useCode()

  const customStyle = {
    ...styleSkeleton,
    paddingLeft: isMobile ? '0.75em' : '0',
  }

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
      <div className={cx('copy-wrapper', { 'click-available': !copied, copied: copied })} onClick={copyToClipboard}>
        {copied ? <BsClipboardCheck /> : <BsClipboard />}
      </div>
      <SyntaxHighlighter
        showLineNumbers={!isMobile}
        style={style}
        lineNumberStyle={{ minWidth: '2.8em' }}
        useInlineStyles={true}
        language={language.replace('++', 'pp')}
        customStyle={customStyle}>
        {children}
      </SyntaxHighlighter>
      <span className={cx('language')}>{language}</span>
    </pre>
  )
}
