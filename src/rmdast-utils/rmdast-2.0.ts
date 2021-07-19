export interface Node {
  type: string
}

export interface Parent {
  children: Node[]
}

export interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

export type BlockContent =
| Blockquote
| Code
| Heading
| List
| ListContent
| ThematicBreak
| Paragraph
| Table
| TableContent
| RowContent
| LeafDirective
| ContainerDirective
| Gallery
| Image

export type InlineContent =
| Link
| Break
| Emphasis
| InlineImage
| InlineCode
| Strong
| Text
| Delete
| Footnote
| TextDirective

export type ListContent = ListItem
export type TableContent = TableRow
export type RowContent = TableCell

export interface Root extends Node, ParentOf<BlockContent[]> {
  type: 'root'
}

export interface Paragraph extends Node, ParentOf<InlineContent[]> {
  type: 'paragraph'
}

export interface Heading extends Node, ParentOf<InlineContent[]> {
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
  ordered: boolean | null
  start: number | null
  spread: boolean | null
}

export interface ListItem extends Node, ParentOf<BlockContent[]> {
  type: 'listItem'
  spread: boolean | null
  checked: boolean | null
}

export interface Code extends Node {
  type: 'code'
  value: string
  lang: string | null
  meta: string | null
}

export interface Text extends Node {
  type: 'text'
  value: string
}

export interface Emphasis extends Node, ParentOf<InlineContent[]> {
  type: 'emphasis'
}

export interface Strong extends Node, ParentOf<InlineContent[]> {
  type: 'strong'
}

export interface InlineCode extends Node {
  type: 'inlineCode'
  value: string
}

export interface Break extends Node {
  type: 'break'
}

export interface Link extends Node, ParentOf<InlineContent[]> {
  type: 'link'
  url: string
  title: string | null
}

export interface Image extends Node {
  type: 'image'
  url: string
  title: string | null
  alt: string | null
}

export interface InlineImage extends Node {
  type: 'inlineImage'
  url: string
  title: string | null
  alt: string | null
}

export interface Table extends Node, ParentOf<TableContent[]> {
  type: 'table'
  align: Array<'left' | 'right' | 'center' | null> | null
}

export interface TableRow extends Node, ParentOf<RowContent[]> {
  type: 'tableRow'
}

export interface TableCell extends Node, ParentOf<InlineContent[]> {
  type: 'tableCell'
}

export interface Delete extends Node, ParentOf<InlineContent[]> {
  type: 'delete'
}

export interface Footnote extends Node, ParentOf<InlineContent[] | BlockContent[]> {
  type: 'footnote'
}

export interface TextDirective extends Node, ParentOf<InlineContent[]> {
  type: 'textDirective'
  name: string
  attributes: Record<string, string>
}

export interface LeafDirective extends Node, ParentOf<InlineContent[]> {
  type: 'leafDirective'
  name: string
  attributes: Record<string, string>
}

export interface ContainerDirective extends Node, ParentOf<BlockContent[]> {
  type: 'containerDirective'
  name: string
  attributes: Record<string, string>
}

export interface Gallery extends Node, ParentOf<Image[]>{
  type: 'gallery'
}