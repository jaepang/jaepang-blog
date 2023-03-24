'use client'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import { BsClipboard, BsClipboardCheck } from 'react-icons/bs'

import { useState } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

/** add languages you want to use */
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'

import classNames from 'classnames/bind'
import styles from './Code.module.css'
const cx = classNames.bind(styles)

export default function Code({ value, children }) {
  const [copied, setCopied] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width <= 732

  SyntaxHighlighter.registerLanguage('jsx', jsx)
  SyntaxHighlighter.registerLanguage('tsx', tsx)
  SyntaxHighlighter.registerLanguage('typescript', typescript)
  SyntaxHighlighter.registerLanguage('javascript', javascript)
  SyntaxHighlighter.registerLanguage('python', python)
  SyntaxHighlighter.registerLanguage('css', css)

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

  const language = value.language?.toLowerCase() || 'text'
  const customStyle = {
    marginBottom: '0',
    padding: '0.9em 0',
    fontSize: '1.5em', // set padding size; default: 1em
    lineHeight: '0',
    borderRadius: 'var(--border-radius)',
    paddingLeft: width <= 732 ? '0.75em' : '0',
  }
  const lineNumberStyle = {
    minWidth: '2.8em',
  }

  return (
    <pre className={cx('root')}>
      <div className={cx('copy-wrapper', { 'click-available': !copied, copied: copied })} onClick={copyToClipboard}>
        {copied ? <BsClipboardCheck /> : <BsClipboard />}
      </div>
      <SyntaxHighlighter
        showLineNumbers={!isMobile}
        style={style}
        lineNumberStyle={lineNumberStyle}
        useInlineStyles={true}
        language={language}
        customStyle={customStyle}>
        {children}
      </SyntaxHighlighter>
      <span className={cx('language')}>{language}</span>
    </pre>
  )
}
