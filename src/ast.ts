export interface Node {
  type: string
}

export interface Parent {
  children: Node[]
}

export interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

export type Content =
| TopLevelContent
| ListContent
| TableContent
| RowContent
| PhrasingContent

export type TopLevelContent =
| BlockContent
// | TopLevelImage

export type BlockContent =
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| Table
| Component
| Code

export type ListContent = ListItem

export type TableContent = TableRow

export type RowContent = TableCell

export type PhrasingContent = StaticPhrasingContent | Link

export type StaticPhrasingContent =
| Text
| Emphasis
| Strong
| Delete
| Component
| InlineCode
| Break
| Image
| Footnote

export interface Root extends Node, ParentOf<Content[]> {
  type: 'root'
}

export interface Paragraph extends Node, ParentOf<PhrasingContent[]> {
  type: 'paragraph'
}

export interface Heading extends Node, ParentOf<PhrasingContent[]> {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ThematicBreak extends Node {
  type: 'thematicBreak'
}

export interface Blockquote extends Node, ParentOf<BlockContent[]> {
  type: 'blockquote'
}

export interface List extends Node, ParentOf<ListContent[]> {
  type: 'list'
  ordered?: boolean
  start?: number
  spread?: boolean
}

export interface ListItem extends Node, ParentOf<BlockContent[]> {
  type: 'listItem'
  checked?: boolean
  spread?: boolean
}

export interface Table extends Node, ParentOf<TableContent[]> {
  type: 'table'
  align?: Array<'left' | 'right' | 'center' | null> // null?
}

export interface TableRow extends Node, ParentOf<RowContent[]> {
  type: 'tableRow'
}

export interface TableCell extends Node, ParentOf<PhrasingContent[]> {
  type: 'tableCell'
}

export interface Component extends Node, ParentOf<Array<Text | Component>> {
  type: 'component'
  name: string
  attributes: { [index: string]: string }
  value: string
}

export interface Code extends Node {
  type: 'code'
  value: string
  lang?: string
  meta?: string
}

export interface Text extends Node {
  type: 'text'
  value: string
}

export interface Emphasis extends Node, ParentOf<PhrasingContent[]> {
  type: 'emphasis'
}

export interface Strong extends Node, ParentOf<PhrasingContent[]> {
  type: 'strong'
}

export interface Delete extends Node, ParentOf<PhrasingContent[]> {
  type: 'delete'
}

export interface InlineCode extends Node {
  type: 'inlineCode'
  value: string
}

export interface Break extends Node {
  type: 'break'
}

export interface Link extends Node, ParentOf<StaticPhrasingContent[]> {
  type: 'link'
  url: string
  title?: string
}

export interface Image extends Node {
  type: 'image'
  url: string
  title?: string
  alt?: string
}

/*
export interface TopLevelImage extends Node {
  type: 'topLevelImage'
  url: string
  title?: string
  alt?: string
}
*/

export interface Footnote extends Node, ParentOf<PhrasingContent[] | BlockContent[]> {
  type: 'footnote'
}
