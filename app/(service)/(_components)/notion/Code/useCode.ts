import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import { useState, useEffect } from 'react'
import { useWindowSize } from '@hooks/useWindowSize'

/** add languages you want to use */
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'

export function useCode() {
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    setIsMobile(width <= 732)
  }, [width])

  SyntaxHighlighter.registerLanguage('jsx', jsx)
  SyntaxHighlighter.registerLanguage('tsx', tsx)
  SyntaxHighlighter.registerLanguage('typescript', typescript)
  SyntaxHighlighter.registerLanguage('javascript', javascript)
  SyntaxHighlighter.registerLanguage('python', python)
  SyntaxHighlighter.registerLanguage('css', css)
  SyntaxHighlighter.registerLanguage('cpp', cpp)

  return { isMobile, SyntaxHighlighter }
}
