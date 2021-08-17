export interface Node {
  type: string
}

export interface Parent {
  children: Node[]
}

export interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

export type BlockNode =
| Root
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| ListItem
| Code
| Image
| Table
| TableRow
| TableCell
| LeafDirective
| ContainerDirective
| Gallery

export type InlineNode =
| Text
| Emphasis
| Strong
| InlineCode
| Break
| Link
| InlineImage
| Delete
| Footnote
| InlineFootnote
| TextDirective

export type RootContent =
| UniversalBlockContent
| Gallery

export type UniversalBlockContent =
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| Code
| Image
| Table
| LeafDirective
| ContainerDirective

export type UniversalInlineContent =
| Text
| Emphasis
| Strong
| InlineCode
| Break
| Link
| InlineImage
| Delete
| Footnote
| InlineFootnote
| TextDirective

export interface Root extends Node, ParentOf<RootContent[]> {
  type: 'root'
}

export interface Paragraph extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'paragraph'
}

export interface Heading extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ThematicBreak extends Node {
  type: 'thematicBreak'
}

export interface Blockquote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'blockquote'
}

export interface List extends Node, ParentOf<ListItem[]> {
  type: 'list'
  ordered: boolean | null
  start: number | null
  spread: boolean | null
}

export interface ListItem extends Node, ParentOf<UniversalBlockContent[]> {
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

export interface Emphasis extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'emphasis'
}

export interface Strong extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'strong'
}

export interface InlineCode extends Node {
  type: 'inlineCode'
  value: string
}

export interface Break extends Node {
  type: 'break'
}

export interface Link extends Node, ParentOf<UniversalInlineContent[]> {
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

export interface Table extends Node, ParentOf<TableRow[]> {
  type: 'table'
  header: TableRow
  children: TableRow[]
}

export interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

export interface TableCell extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'tableCell'
}

export interface Delete extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'delete'
}

export interface Footnote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'footnote'
}

export interface InlineFootnote extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'inlineFootnote'
}

export interface TextDirective extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'textDirective'
  name: string
  attributes: Record<string, string>
}

export interface LeafDirective extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'leafDirective'
  name: string
  attributes: Record<string, string>
}

export interface ContainerDirective extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'containerDirective'
  name: string
  attributes: Record<string, string>
}

export interface Gallery extends Node, ParentOf<Image[]>{
  type: 'gallery'
}
