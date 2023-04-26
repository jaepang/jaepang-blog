import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import {
  RichTextItemResponse,
  TextRichTextItemResponse,
  EquationRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Text.module.css'
const cx = classNames.bind(styles)

interface Props {
  text: RichTextItemResponse[]
}

export default function Text({ text }: Props) {
  if (!text) return null

  function isText(value: any): value is TextRichTextItemResponse {
    return value.type === 'text'
  }

  return (
    <>
      {text.map((value, idx) => {
        const {
          annotations: { bold, italic, color, strikethrough, underline, code },
        } = value ?? {}

        const isBackgroundColor = color.includes('background')

        /** used when the richtext is from text */
        const { text } = (value as TextRichTextItemResponse) ?? {}
        const { content, link } = text ?? {}

        /** used when the richtext is from equation */
        const { equation } = (value as EquationRichTextItemResponse) ?? {}
        const { expression } = equation ?? {}

        const body = isText(value) ? content : <InlineMath>{expression}</InlineMath>

        return (
          <span
            key={content ?? idx}
            className={cx('text', {
              bold,
              link: !!link,
              italic,
              strikethrough,
              underline,
              code,
            })}
            style={{
              color: !isBackgroundColor && color !== 'default' ? `var(--color-text-${color})` : 'none',
              backgroundColor: isBackgroundColor ? `var(--color-bg-${color.slice(0, -11)})` : 'none',
            }}>
            {link ? <a href={link.url}>{body ?? ''}</a> : body ?? ''}
          </span>
        )
      })}
    </>
  )
}
