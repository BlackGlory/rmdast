import { AlignType, Resource, Alternative } from 'mdast'

export interface Node {
  type: string
}

export type Content =
| TopLevelContent
| ListContent
| TableContent
| RowContent
| PhrasingContent

export type TopLevelContent =
| BlockContent

export type BlockContent =
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| Table
| HTML
| Code

export type ListContent = ListItem;

export type TableContent = TableRow;

export type RowContent = TableCell;

export type PhrasingContent = StaticPhrasingContent | Link

export type StaticPhrasingContent =
| Text
| Emphasis
| Strong
| Delete
| HTML
| InlineCode
| Break
| Image
| Footnote

export interface Root {
  type: 'root'
  children: Content[]
}

export interface Paragraph {
  type: 'paragraph'
  children: PhrasingContent[]
}

export interface Heading {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
  children: PhrasingContent[]
}

export interface ThematicBreak {
  type: 'thematicBreak'
}

export interface Blockquote {
  type: 'blockquote'
  children: BlockContent[]
}

export interface List {
  type: 'list'
  ordered?: boolean
  start?: number
  spread?: boolean
  children: ListContent[]
}

export interface ListItem {
  type: 'listItem'
  checked?: boolean
  spread?: boolean
  children: BlockContent[]
}

export interface Table {
  type: 'table'
  align?: AlignType[]
  children: TableContent[]
}

export interface TableRow {
  type: 'tableRow'
  children: RowContent[]
}

export interface TableCell {
  type: 'tableCell'
  children: PhrasingContent[]
}

export interface HTML {
  type: 'html'
  value: string
}

export interface Code {
  type: 'code'
  value: string
  lang?: string
  meta?: string
}

export interface Text {
  type: 'text'
  value: string
}

export interface Emphasis {
  type: 'emphasis'
  children: PhrasingContent[]
}

export interface Strong {
  type: 'strong'
  children: PhrasingContent[]
}

export interface Delete {
  type: 'delete'
  children: PhrasingContent[]
}

export interface InlineCode {
  type: 'inlineCode'
  value: string
}

export interface Break {
  type: 'break'
}

export interface Link extends Resource {
  type: 'link'
  children: StaticPhrasingContent[]
}

export interface Image extends Resource, Alternative {
  type: 'image'
}

export interface Footnote {
  type: 'footnote'
  children: PhrasingContent[] | BlockContent[]
}

export interface Component {
  type: 'component'
  attrs: { [index: string]: string }
  children: any[]
}
