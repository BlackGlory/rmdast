// https://github.com/syntax-tree/mdast/tree/4.0.0
import { Parent as UnistParent, Literal as UnistLiteral, Node } from 'unist'
export { Node } from 'unist'

// Nodes

interface Parent extends UnistParent {
  children: MdastContent[]
}

interface Literal extends UnistLiteral {
  value: string
}

export interface Root extends Parent {
  type: 'root'
}

export interface Paragraph extends Parent {
  type: 'paragraph'
  children: PhrasingContent[]
}

export interface Heading extends Parent {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
  children: PhrasingContent[]
}

export interface ThematicBreak extends Node {
  type: 'thematicBreak'
}

export interface Blockquote extends Parent {
  type: 'blockquote'
  children: FlowContent[]
}

export interface List extends Parent {
  type: 'list'
  ordered?: boolean
  start?: number
  spread?: boolean
  children: ListContent[]
}

export interface ListItem extends Parent {
  type: 'listItem'
  spread?: boolean
  checked?: boolean // gfm
  children: FlowContent[]
}

export interface HTML extends Literal {
  type: 'html'
}

export interface Code extends Literal {
  type: 'code'
  lang?: string
  meta?: string
}

export interface Definition extends Node, Association, Resource {
  type: 'definition'
}

export interface Text extends Literal {
  type: 'text'
}

export interface Emphasis extends Parent {
  type: 'emphasis'
  children: TransparentContent<Emphasis>[]
}

export interface Strong extends Parent {
  type: 'strong'
  children: TransparentContent<Strong>[]
}

export interface InlineCode extends Literal {
  type: 'inlineCode'
}

export interface Break extends Node {
  type: 'break'
}

export interface Link extends Parent, Resource {
  type: 'link'
  children: StaticPhrasingContent[]
}

export interface Image extends Node, Resource, Alternative {
  type: 'image'
}

export interface LinkReference extends Parent, Reference {
  type: 'linkReference'
  children: StaticPhrasingContent[]
}

export interface ImageReference extends Node, Reference, Alternative {
  type: 'imageReference'
}

// gfm
export interface Table extends Parent {
  type: 'table'
  align?: Array<'left' | 'right' | 'center' | null>
  children: TableContent[]
}

// gfm
export interface TableRow extends Parent {
  type: 'tableRow'
  children: RowContent[]
}

// gfm
export interface TableCell extends Parent {
  type: 'tableCell'
  children: PhrasingContent[]
}

// gfm
export interface Delete extends Parent {
  type: 'delete'
  children: TransparentContent<Delete>[]
}

// footnote
export interface Footnote extends Parent {
  type: 'footnote'
  children: PhrasingContent[]
}

// footnote
export interface FootnoteDefinition extends Parent, Association {
  type: 'footnoteDefinition'
  children: FlowContent[]
}

// footnote
export interface FootnoteReference extends Node, Association {
  type: 'footnoteReference'
}

// directive
export interface TextDirective extends Parent, Directive {
  type: 'textDirective'
  children: PhrasingContent[]
}

// directive
export interface LeafDirective extends Parent, Directive {
  type: 'leafDirective'
  children: PhrasingContent[]
}

// directive
export interface ContainerDirective extends Parent, Directive {
  type: 'containerDirective'
  children: FlowContent[]
}

// Mixin

interface Resource {
  url: string
  title?: string
}

interface Association {
  identifier: string
  label?: string
}

interface Reference extends Association {
  referenceType: 'shortcut' | 'collapsed' | 'full'
}

interface Alternative {
  alt?: string
}

interface Directive {
  name: string
  attributes?: Attributes
}

type Attributes = Record<string, string>

// Content model

export type MdastContent =
| FlowContent
| ListContent
| PhrasingContent
| TableContent // gfm
| RowContent // gfm

export type FlowContent =
| Blockquote
| Code
| Heading
| HTML
| List
| ThematicBreak
| Content
| Table // gfm
| FootnoteDefinition  // footnote
| LeafDirective // directive
| ContainerDirective // directive

export type Content =
| Definition
| Paragraph

export type ListContent = ListItem

export type PhrasingContent =
| Link
| LinkReference
| StaticPhrasingContent
| TextDirective // directive

export type StaticPhrasingContent =
| Break
| Emphasis
| HTML
| Image
| ImageReference
| InlineCode
| Strong
| Text
| Delete // gfm
| Footnote // footnote
| FootnoteReference // footnote

export type TransparentContent<T> = Exclude<PhrasingContent, T>

export type TableContent = TableRow

export type RowContent = TableCell
