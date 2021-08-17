import * as RMDAST from '@src/rmdast.js'

export function is<T extends RMDAST.Node>(
  node: RMDAST.Node
, type: string
): node is T {
  return node.type === type
}

export function isParent(node: RMDAST.Node): node is RMDAST.Node & RMDAST.Parent {
  return 'children' in node
}

export function isBlockNode(node: RMDAST.Node): node is RMDAST.BlockNode {
  return isRoot(node)
      || isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isListItem(node)
      || isCode(node)
      || isImage(node)
      || isTable(node)
      || isTableRow(node)
      || isTableCell(node)
      || isLeafDirective(node)
      || isContainerDirective(node)
      || isGallery(node)
}

export function isInlineNode(node: RMDAST.Node): node is RMDAST.InlineNode {
  return isText(node)
      || isEmphasis(node)
      || isStrong(node)
      || isInlineCode(node)
      || isBreak(node)
      || isLink(node)
      || isInlineImage(node)
      || isDelete(node)
      || isFootnote(node)
      || isInlineFootnote(node)
      || isTextDirective(node)
}

export function isRootContent(node: RMDAST.Node): node is RMDAST.RootContent {
  return isUniversalBlockContent(node)
      || isGallery(node)
}

export function isUniversalBlockContent(
  node: RMDAST.Node
): node is RMDAST.UniversalBlockContent {
  return isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isCode(node)
      || isImage(node)
      || isTable(node)
      || isLeafDirective(node)
      || isContainerDirective(node)
}

export function isUniversalInlineContent(
  node: RMDAST.Node
): node is RMDAST.UniversalInlineContent {
  return isText(node)
      || isEmphasis(node)
      || isStrong(node)
      || isInlineCode(node)
      || isBreak(node)
      || isLink(node)
      || isInlineImage(node)
      || isDelete(node)
      || isFootnote(node)
      || isInlineFootnote(node)
      || isTextDirective(node)
}

export function isGallery(node: RMDAST.Node): node is RMDAST.Gallery {
  return is(node, 'gallery')
}

export function isRoot(node: RMDAST.Node): node is RMDAST.Root {
  return is(node, 'root')
}

export function isParagraph(node: RMDAST.Node): node is RMDAST.Paragraph {
  return is(node, 'paragraph')
}

export function isHeading(node: RMDAST.Node): node is RMDAST.Heading {
  return is(node, 'heading')
}

export function isThematicBreak(node: RMDAST.Node): node is RMDAST.ThematicBreak {
  return is(node, 'thematicBreak')
}

export function isBlockquote(node: RMDAST.Node): node is RMDAST.Blockquote {
  return is(node, 'blockquote')
}

export function isList(node: RMDAST.Node): node is RMDAST.List {
  return is(node, 'list')
}

export function isListItem(node: RMDAST.Node): node is RMDAST.ListItem {
  return is(node, 'listItem')
}

export function isTable(node: RMDAST.Node): node is RMDAST.Table {
  return is(node, 'table')
}

export function isTableRow(node: RMDAST.Node): node is RMDAST.TableRow {
  return is(node, 'tableRow')
}

export function isTableCell(node: RMDAST.Node): node is RMDAST.TableCell {
  return is(node, 'tableCell')
}

export function isCode(node: RMDAST.Node): node is RMDAST.Code {
  return is(node, 'code')
}

export function isText(node: RMDAST.Node): node is RMDAST.Text {
  return is(node, 'text')
}

export function isEmphasis(node: RMDAST.Node): node is RMDAST.Emphasis {
  return is(node, 'emphasis')
}

export function isStrong(node: RMDAST.Node): node is RMDAST.Strong {
  return is(node, 'strong')
}

export function isDelete(node: RMDAST.Node): node is RMDAST.Delete {
  return is(node, 'delete')
}

export function isInlineCode(node: RMDAST.Node): node is RMDAST.InlineCode {
  return is(node, 'inlineCode')
}

export function isBreak(node: RMDAST.Node): node is RMDAST.Break {
  return is(node, 'break')
}

export function isLink(node: RMDAST.Node): node is RMDAST.Link {
  return is(node, 'link')
}

export function isImage(node: RMDAST.Node): node is RMDAST.Image {
  return is(node, 'image')
}

export function isInlineImage(node: RMDAST.Node): node is RMDAST.InlineImage {
  return is(node, 'inlineImage')
}

export function isFootnote(node: RMDAST.Node): node is RMDAST.Footnote {
  return is(node, 'footnote')
}

export function isInlineFootnote(node: RMDAST.Node): node is RMDAST.InlineFootnote {
  return is(node, 'inlineFootnote')
}

export function isTextDirective(node: RMDAST.Node): node is RMDAST.TextDirective {
  return is(node, 'textDirective')
}

export function isLeafDirective(node: RMDAST.Node): node is RMDAST.LeafDirective {
  return is(node, 'leafDirective')
}

export function isContainerDirective(node: RMDAST.Node): node is RMDAST.ContainerDirective {
  return is(node, 'containerDirective')
}
