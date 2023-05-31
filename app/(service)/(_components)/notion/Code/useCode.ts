import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

/** add languages you want to use */
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import shell from 'react-syntax-highlighter/dist/esm/languages/prism/shell-session'

export function useCode() {
  const customStyle = {
    marginBottom: '0',
    padding: '1.3em 0.7em',
    fontSize: '1.5em', // set padding size; default: 1em
    lineHeight: '0',
    borderRadius: 'var(--border-radius)',
  }
  SyntaxHighlighter.registerLanguage('jsx', jsx)
  SyntaxHighlighter.registerLanguage('tsx', tsx)
  SyntaxHighlighter.registerLanguage('typescript', typescript)
  SyntaxHighlighter.registerLanguage('javascript', javascript)
  SyntaxHighlighter.registerLanguage('python', python)
  SyntaxHighlighter.registerLanguage('css', css)
  SyntaxHighlighter.registerLanguage('cpp', cpp)
  SyntaxHighlighter.registerLanguage('shell', shell)

  return { SyntaxHighlighter, customStyle }
}
