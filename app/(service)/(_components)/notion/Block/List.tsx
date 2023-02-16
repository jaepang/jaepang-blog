import Block from '.'

export default function List({ block }) {
  const { type } = block
  const value = block[type]

  if (!value) return null

  const isNumberedList = type === 'numbered_list_item'

  /* @ts-expect-error Server Component */
  const children = value.children.map(block => <Block key={block.id} block={block} />)

  return isNumberedList ? <ol>{children}</ol> : <ul>{children}</ul>
}
