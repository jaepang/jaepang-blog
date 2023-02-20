import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Text.module.css'
const cx = classNames.bind(styles)

interface TextProps {
  text: TextRichTextItemResponse[]
}

export default function Text({ text }: TextProps) {
  if (!text) return null

  return (
    <>
      {text.map((value, idx) => {
        const {
          annotations: { bold, italic, color, strikethrough, underline, code },
          text,
        } = value ?? {}

        const { content, link } = text ?? {}

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
              color: color !== 'default' && `var(--color-text-${color})`,
            }}>
            {link ? <a href={link.url}>{content ?? ''}</a> : content ?? ''}
          </span>
        )
      })}
    </>
  )
}
