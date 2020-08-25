import { Node } from './ast'
import * as AST from './ast'

export function is<T extends Node>(node: Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: Node): node is Node & AST.Parent {
  return 'children' in node
}

export function isContent(node: Node): node is AST.Content {
  return isTopLevelContent(node)
      || isListContent(node)
      || isTableContent(node)
      || isRowContent(node)
      || isPhrasingContent(node)
}

export function isTopLevelContent(node: Node): node is AST.TopLevelContent {
  return isBlockContent(node)
}

export function isBlockContent(node: Node): node is AST.BlockContent {
  return isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isTable(node)
      || isComponent(node)
      || isCode(node)
}

export function isListContent(node: Node): node is AST.ListContent {
  return isListItem(node)
}

export function isTableContent(node: Node): node is AST.TableContent {
  return isTableRow(node)
}

export function isRowContent(node: Node): node is AST.RowContent {
  return isTableCell(node)
}

export function isPhrasingContent(node: Node): node is AST.PhrasingContent {
  return isStaticPhrasingContent(node)
      || isLink(node)
}

export function isStaticPhrasingContent(node: Node): node is AST.StaticPhrasingContent {
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

export function isRoot(node: Node): node is AST.Root {
  return is<AST.Root>(node, 'root')
}

export function isParagraph(node: Node): node is AST.Paragraph {
  return is<AST.Paragraph>(node, 'paragraph')
}

export function isHeading(node: Node): node is AST.Heading {
  return is<AST.Heading>(node, 'heading')
}

export function isThematicBreak(node: Node): node is AST.ThematicBreak {
  return is<AST.ThematicBreak>(node, 'thematicBreak')
}

export function isBlockquote(node: Node): node is AST.Blockquote {
  return is<AST.Blockquote>(node, 'blockquote')
}

export function isList(node: Node): node is AST.List {
  return is<AST.List>(node, 'list')
}

export function isListItem(node: Node): node is AST.ListItem {
  return is<AST.ListItem>(node, 'listItem')
}

export function isTable(node: Node): node is AST.Table {
  return is<AST.Table>(node, 'table')
}

export function isTableRow(node: Node): node is AST.TableRow {
  return is<AST.TableRow>(node, 'tableRow')
}

export function isTableCell(node: Node): node is AST.TableCell {
  return is<AST.TableCell>(node, 'tableCell')
}

export function isComponent(node: Node): node is AST.Component {
  return is<AST.Component>(node, 'component')
}

export function isCode(node: Node): node is AST.Code {
  return is<AST.Code>(node, 'code')
}

export function isText(node: Node): node is AST.Text {
  return is<AST.Text>(node, 'text')
}

export function isEmphasis(node: Node): node is AST.Emphasis {
  return is<AST.Emphasis>(node, 'emphasis')
}

export function isStrong(node: Node): node is AST.Strong {
  return is<AST.Strong>(node, 'strong')
}

export function isDelete(node: Node): node is AST.Delete {
  return is<AST.Delete>(node, 'delete')
}

export function isInlineCode(node: Node): node is AST.InlineCode {
  return is<AST.InlineCode>(node, 'inlineCode')
}

export function isBreak(node: Node): node is AST.Break {
  return is<AST.Break>(node, 'break')
}

export function isLink(node: Node): node is AST.Link {
  return is<AST.Link>(node, 'link')
}

export function isImage(node: Node): node is AST.Image {
  return is<AST.Image>(node, 'image')
}

export function isFootnote(node: Node): node is AST.Footnote {
  return is<AST.Footnote>(node, 'footnote')
}
