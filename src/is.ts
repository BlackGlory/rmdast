import { Node } from './rmdast-1.0'
import * as RMDAST from './rmdast-1.0'

export function is<T extends Node>(node: Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: Node): node is Node & RMDAST.Parent {
  return 'children' in node
}

export function isContent(node: Node): node is RMDAST.Content {
  return isTopLevelContent(node)
      || isListContent(node)
      || isTableContent(node)
      || isRowContent(node)
      || isPhrasingContent(node)
}

export function isTopLevelContent(node: Node): node is RMDAST.TopLevelContent {
  return isBlockContent(node)
}

export function isBlockContent(node: Node): node is RMDAST.BlockContent {
  return isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isTable(node)
      || isComponent(node)
      || isCode(node)
}

export function isListContent(node: Node): node is RMDAST.ListContent {
  return isListItem(node)
}

export function isTableContent(node: Node): node is RMDAST.TableContent {
  return isTableRow(node)
}

export function isRowContent(node: Node): node is RMDAST.RowContent {
  return isTableCell(node)
}

export function isPhrasingContent(node: Node): node is RMDAST.PhrasingContent {
  return isStaticPhrasingContent(node)
      || isLink(node)
}

export function isStaticPhrasingContent(node: Node): node is RMDAST.StaticPhrasingContent {
  return isText(node)
      || isEmphasis(node)
      || isStrong(node)
      || isDelete(node)
      || isComponent(node)
      || isInlineCode(node)
      || isBreak(node)
      || isImage(node)
      || isFootnote(node)
}

export function isRoot(node: Node): node is RMDAST.Root {
  return is<RMDAST.Root>(node, 'root')
}

export function isParagraph(node: Node): node is RMDAST.Paragraph {
  return is<RMDAST.Paragraph>(node, 'paragraph')
}

export function isHeading(node: Node): node is RMDAST.Heading {
  return is<RMDAST.Heading>(node, 'heading')
}

export function isThematicBreak(node: Node): node is RMDAST.ThematicBreak {
  return is<RMDAST.ThematicBreak>(node, 'thematicBreak')
}

export function isBlockquote(node: Node): node is RMDAST.Blockquote {
  return is<RMDAST.Blockquote>(node, 'blockquote')
}

export function isList(node: Node): node is RMDAST.List {
  return is<RMDAST.List>(node, 'list')
}

export function isListItem(node: Node): node is RMDAST.ListItem {
  return is<RMDAST.ListItem>(node, 'listItem')
}

export function isTable(node: Node): node is RMDAST.Table {
  return is<RMDAST.Table>(node, 'table')
}

export function isTableRow(node: Node): node is RMDAST.TableRow {
  return is<RMDAST.TableRow>(node, 'tableRow')
}

export function isTableCell(node: Node): node is RMDAST.TableCell {
  return is<RMDAST.TableCell>(node, 'tableCell')
}

export function isComponent(node: Node): node is RMDAST.Component {
  return is<RMDAST.Component>(node, 'component')
}

export function isCode(node: Node): node is RMDAST.Code {
  return is<RMDAST.Code>(node, 'code')
}

export function isText(node: Node): node is RMDAST.Text {
  return is<RMDAST.Text>(node, 'text')
}

export function isEmphasis(node: Node): node is RMDAST.Emphasis {
  return is<RMDAST.Emphasis>(node, 'emphasis')
}

export function isStrong(node: Node): node is RMDAST.Strong {
  return is<RMDAST.Strong>(node, 'strong')
}

export function isDelete(node: Node): node is RMDAST.Delete {
  return is<RMDAST.Delete>(node, 'delete')
}

export function isInlineCode(node: Node): node is RMDAST.InlineCode {
  return is<RMDAST.InlineCode>(node, 'inlineCode')
}

export function isBreak(node: Node): node is RMDAST.Break {
  return is<RMDAST.Break>(node, 'break')
}

export function isLink(node: Node): node is RMDAST.Link {
  return is<RMDAST.Link>(node, 'link')
}

export function isImage(node: Node): node is RMDAST.Image {
  return is<RMDAST.Image>(node, 'image')
}

export function isFootnote(node: Node): node is RMDAST.Footnote {
  return is<RMDAST.Footnote>(node, 'footnote')
}
