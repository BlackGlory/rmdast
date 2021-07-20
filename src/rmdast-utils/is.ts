import * as RMDAST from './rmdast-2.0'

export function is<T extends RMDAST.Node>(node: RMDAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: RMDAST.Node): node is RMDAST.Node & RMDAST.Parent {
  return 'children' in node
}

export function isBlockContent(node: RMDAST.Node): node is RMDAST.BlockContent {
  return isBlockquote(node)
      || isCode(node)
      || isHeading(node)
      || isList(node)
      || isThematicBreak(node)
      || isParagraph(node)
      || isTable(node)
      || isLeafDirective(node)
      || isContainerDirective(node)
      || isGallery(node)
      || isImage(node)
}

export function isInlineContent(node: RMDAST.Node): node is RMDAST.InlineContent {
  return isLink(node)
      || isBreak(node)
      || isEmphasis(node)
      || isInlineImage(node)
      || isInlineCode(node)
      || isStrong(node)
      || isText(node)
      || isDelete(node)
      || isFootnote(node)
      || isTextDirective(node)
}

export function isListContent(node: RMDAST.Node): node is RMDAST.ListContent {
  return isListItem(node)
}

export function isTableContent(node: RMDAST.Node): node is RMDAST.TableContent {
  return isTableRow(node)
}

export function isRowContent(node: RMDAST.Node): node is RMDAST.RowContent {
  return isTableCell(node)
}

export function isGallery(node: RMDAST.Node): node is RMDAST.Gallery {
  return is<RMDAST.Gallery>(node, 'gallery')
}

export function isRoot(node: RMDAST.Node): node is RMDAST.Root {
  return is<RMDAST.Root>(node, 'root')
}

export function isParagraph(node: RMDAST.Node): node is RMDAST.Paragraph {
  return is<RMDAST.Paragraph>(node, 'paragraph')
}

export function isHeading(node: RMDAST.Node): node is RMDAST.Heading {
  return is<RMDAST.Heading>(node, 'heading')
}

export function isThematicBreak(node: RMDAST.Node): node is RMDAST.ThematicBreak {
  return is<RMDAST.ThematicBreak>(node, 'thematicBreak')
}

export function isBlockquote(node: RMDAST.Node): node is RMDAST.Blockquote {
  return is<RMDAST.Blockquote>(node, 'blockquote')
}

export function isList(node: RMDAST.Node): node is RMDAST.List {
  return is<RMDAST.List>(node, 'list')
}

export function isListItem(node: RMDAST.Node): node is RMDAST.ListItem {
  return is<RMDAST.ListItem>(node, 'listItem')
}

export function isTable(node: RMDAST.Node): node is RMDAST.Table {
  return is<RMDAST.Table>(node, 'table')
}

export function isTableRow(node: RMDAST.Node): node is RMDAST.TableRow {
  return is<RMDAST.TableRow>(node, 'tableRow')
}

export function isTableCell(node: RMDAST.Node): node is RMDAST.TableCell {
  return is<RMDAST.TableCell>(node, 'tableCell')
}

export function isCode(node: RMDAST.Node): node is RMDAST.Code {
  return is<RMDAST.Code>(node, 'code')
}

export function isText(node: RMDAST.Node): node is RMDAST.Text {
  return is<RMDAST.Text>(node, 'text')
}

export function isEmphasis(node: RMDAST.Node): node is RMDAST.Emphasis {
  return is<RMDAST.Emphasis>(node, 'emphasis')
}

export function isStrong(node: RMDAST.Node): node is RMDAST.Strong {
  return is<RMDAST.Strong>(node, 'strong')
}

export function isDelete(node: RMDAST.Node): node is RMDAST.Delete {
  return is<RMDAST.Delete>(node, 'delete')
}

export function isInlineCode(node: RMDAST.Node): node is RMDAST.InlineCode {
  return is<RMDAST.InlineCode>(node, 'inlineCode')
}

export function isBreak(node: RMDAST.Node): node is RMDAST.Break {
  return is<RMDAST.Break>(node, 'break')
}

export function isLink(node: RMDAST.Node): node is RMDAST.Link {
  return is<RMDAST.Link>(node, 'link')
}

export function isImage(node: RMDAST.Node): node is RMDAST.Image {
  return is<RMDAST.Image>(node, 'image')
}

export function isInlineImage(node: RMDAST.Node): node is RMDAST.InlineImage {
  return is<RMDAST.InlineImage>(node, 'inlineImage')
}

export function isFootnote(node: RMDAST.Node): node is RMDAST.Footnote {
  return is<RMDAST.Footnote>(node, 'footnote')
}

export function isTextDirective(node: RMDAST.Node): node is RMDAST.TextDirective {
  return is<RMDAST.TextDirective>(node, 'textDirective')
}

export function isLeafDirective(node: RMDAST.Node): node is RMDAST.LeafDirective {
  return is<RMDAST.LeafDirective>(node, 'leafDirective')
}

export function isContainerDirective(node: RMDAST.Node): node is RMDAST.ContainerDirective {
  return is<RMDAST.ContainerDirective>(node, 'containerDirective')
}
