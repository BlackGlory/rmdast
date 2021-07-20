import * as MDAST from './mdast-4.0'

function is<T extends MDAST.Node>(node: MDAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: MDAST.Node): node is MDAST.Parent {
  return 'children' in node
}

export function isMdastContent(node: MDAST.Node): node is MDAST.MdastContent {
  return isFlowContent(node)
      || isListContent(node)
      || isPhrasingContent(node)
      || isTableContent(node)
      || isRowContent(node)
}

export function isFlowContent(node: MDAST.Node): node is MDAST.FlowContent {
  return isBlockquote(node)
      || isCode(node)
      || isHeading(node)
      || isHTML(node)
      || isList(node)
      || isThematicBreak(node)
      || isContent(node)
      || isTable(node)
      || isFootnoteDefinition(node)
      || isLeafDirective(node)
      || isContainerDirective(node)
}

export function isContent(node: MDAST.Node): node is MDAST.Content {
  return isDefinition(node)
      || isParagraph(node)
}

export function isListContent(node: MDAST.Node): node is MDAST.ListContent {
  return isListItem(node)
}

export function isPhrasingContent(node: MDAST.Node): node is MDAST.PhrasingContent {
  return isLink(node)
      || isLinkReference(node)
      || isStaticPhrasingContent(node)
      || isTextDirective(node)
}

export function isStaticPhrasingContent(node: MDAST.Node): node is MDAST.StaticPhrasingContent {
  return isBreak(node)
      || isEmphasis(node)
      || isHTML(node)
      || isImage(node)
      || isImageReference(node)
      || isInlineCode(node)
      || isStrong(node)
      || isText(node)
      || isDelete(node)
      || isFootnote(node)
      || isFootnoteReference(node)
}

export function isTableContent(node: MDAST.Node): node is MDAST.TableContent {
  return isTableRow(node)
}

export function isRowContent(node: MDAST.Node): node is MDAST.RowContent {
  return isTableCell(node)
}

export function isParagraph(node: MDAST.Node): node is MDAST.Paragraph {
  return is(node, 'paragraph')
}

export function isHeading(node: MDAST.Node): node is MDAST.Heading {
  return is(node, 'heading')
}

export function isThematicBreak(node: MDAST.Node): node is MDAST.ThematicBreak {
  return is(node, 'thematicBreak')
}

export function isBlockquote(node: MDAST.Node): node is MDAST.Blockquote {
  return is(node, 'blockquote')
}

export function isList(node: MDAST.Node): node is MDAST.List {
  return is(node, 'list')
}

export function isListItem(node: MDAST.Node): node is MDAST.ListItem {
  return is(node, 'listItem')
}

export function isHTML(node: MDAST.Node): node is MDAST.HTML {
  return is(node, 'html')
}

export function isCode(node: MDAST.Node): node is MDAST.Code {
  return is(node, 'code')
}

export function isDefinition(node: MDAST.Node): node is MDAST.Definition {
  return is(node, 'definition')
}

export function isText(node: MDAST.Node): node is MDAST.Text {
  return is(node, 'text')
}

export function isEmphasis(node: MDAST.Node): node is MDAST.Emphasis {
  return is(node, 'emphasis')
}

export function isStrong(node: MDAST.Node): node is MDAST.Strong {
  return is(node, 'strong')
}

export function isInlineCode(node: MDAST.Node): node is MDAST.InlineCode {
  return is(node, 'inlineCode')
}

export function isBreak(node: MDAST.Node): node is MDAST.Break {
  return is(node, 'break')
}

export function isLink(node: MDAST.Node): node is MDAST.Link {
  return is(node, 'link')
}

export function isImage(node: MDAST.Node): node is MDAST.Image {
  return is(node, 'image')
}

export function isLinkReference(node: MDAST.Node): node is MDAST.LinkReference {
  return is(node, 'linkReference')
}

export function isImageReference(node: MDAST.Node): node is MDAST.ImageReference {
  return is(node, 'imageReference')
}

export function isTable(node: MDAST.Node): node is MDAST.Table {
  return is(node, 'table')
}

export function isTableRow(node: MDAST.Node): node is MDAST.TableRow {
  return is(node, 'tableRow')
}

export function isTableCell(node: MDAST.Node): node is MDAST.TableCell {
  return is(node, 'tableCell')
}

export function isDelete(node: MDAST.Node): node is MDAST.Delete {
  return is(node, 'delete')
}

export function isFootnote(node: MDAST.Node): node is MDAST.Footnote {
  return is(node, 'footnote')
}

export function isFootnoteDefinition(node: MDAST.Node): node is MDAST.FootnoteDefinition {
  return is(node, 'footnoteDefinition')
}

export function isFootnoteReference(node: MDAST.Node): node is MDAST.FootnoteReference {
  return is(node, 'footnoteReference')
}

export function isTextDirective(node: MDAST.Node): node is MDAST.TextDirective {
  return is(node, 'textDirective')
}

export function isLeafDirective(node: MDAST.Node): node is MDAST.LeafDirective {
  return is(node, 'leafDirective')
}

export function isContainerDirective(node: MDAST.Node): node is MDAST.ContainerDirective {
  return is(node, 'containerDirective')
}
