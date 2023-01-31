import Block from '.'

export default function List({ block }) {
  const { type } = block
  const value = block[type]

  if (!value) return null

  const isNumberedList = type === 'numbered_list_item'
  const children = value.children.map(child => Block(child))

  return isNumberedList ? <ol>{children}</ol> : <ul>{children}</ul>
}
