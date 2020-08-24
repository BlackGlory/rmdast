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
// | TopLevelImage

export type BlockContent =
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| Table
| HTML
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
| HTML
| InlineCode
| Break
| Image
| Footnote

export type HTML = Component | Comment

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
  align?: Array<'left' | 'right' | 'center' | null> // null?
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

export interface Component {
  type: 'component'
  name: string
  attrs: { [index: string]: string }
  children: Array<Text | Comment | Component | Component[]>
  value: string
}

export interface Comment {
  type :'comment'
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

export interface Link {
  type: 'link'
  url: string
  title?: string
  children: StaticPhrasingContent[]
}

export interface Image {
  type: 'image'
  url: string
  title?: string
  alt?: string
}

/*
export interface TopLevelImage {
  type: 'topLevelImage'
  url: string
  title?: string
  alt?: string
}
*/

export interface Footnote {
  type: 'footnote'
  children: PhrasingContent[] | BlockContent[]
}
