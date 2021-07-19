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
  return is<MDAST.Paragraph>(node, 'paragraph')
}

export function isHeading(node: MDAST.Node): node is MDAST.Heading {
  return is<MDAST.Heading>(node, 'heading')
}

export function isThematicBreak(node: MDAST.Node): node is MDAST.ThematicBreak {
  return is<MDAST.ThematicBreak>(node, 'thematicBreak')
}

export function isBlockquote(node: MDAST.Node): node is MDAST.Blockquote {
  return is<MDAST.Blockquote>(node, 'blockquote')
}

export function isList(node: MDAST.Node): node is MDAST.List {
  return is<MDAST.List>(node, 'list')
}

export function isListItem(node: MDAST.Node): node is MDAST.ListItem {
  return is<MDAST.ListItem>(node, 'listItem')
}

export function isHTML(node: MDAST.Node): node is MDAST.HTML {
  return is<MDAST.HTML>(node, 'html')
}

export function isCode(node: MDAST.Node): node is MDAST.Code {
  return is<MDAST.Code>(node, 'code')
}

export function isDefinition(node: MDAST.Node): node is MDAST.Definition {
  return is<MDAST.Definition>(node, 'definition')
}

export function isText(node: MDAST.Node): node is MDAST.Text {
  return is<MDAST.Text>(node, 'text')
}

export function isEmphasis(node: MDAST.Node): node is MDAST.Emphasis {
  return is<MDAST.Emphasis>(node, 'emphasis')
}

export function isStrong(node: MDAST.Node): node is MDAST.Strong {
  return is<MDAST.Strong>(node, 'strong')
}

export function isInlineCode(node: MDAST.Node): node is MDAST.InlineCode {
  return is<MDAST.InlineCode>(node, 'inlineCode')
}

export function isBreak(node: MDAST.Node): node is MDAST.Break {
  return is<MDAST.Break>(node, 'break')
}

export function isLink(node: MDAST.Node): node is MDAST.Link {
  return is<MDAST.Link>(node, 'link')
}

export function isImage(node: MDAST.Node): node is MDAST.Image {
  return is<MDAST.Image>(node, 'image')
}

export function isLinkReference(node: MDAST.Node): node is MDAST.LinkReference {
  return is<MDAST.LinkReference>(node, 'linkReference')
}

export function isImageReference(node: MDAST.Node): node is MDAST.ImageReference {
  return is<MDAST.ImageReference>(node, 'imageReference')
}

export function isTable(node: MDAST.Node): node is MDAST.Table {
  return is<MDAST.Table>(node, 'table')
}

export function isTableRow(node: MDAST.Node): node is MDAST.TableRow {
  return is<MDAST.TableRow>(node, 'tableRow')
}

export function isTableCell(node: MDAST.Node): node is MDAST.TableCell {
  return is<MDAST.TableCell>(node, 'tableCell')
}

export function isDelete(node: MDAST.Node): node is MDAST.Delete {
  return is<MDAST.Delete>(node, 'delete')
}

export function isFootnote(node: MDAST.Node): node is MDAST.Footnote {
  return is<MDAST.Footnote>(node, 'footnote')
}

export function isFootnoteDefinition(node: MDAST.Node): node is MDAST.FootnoteDefinition {
  return is<MDAST.FootnoteDefinition>(node, 'footnoteDefinition')
}

export function isFootnoteReference(node: MDAST.Node): node is MDAST.FootnoteReference {
  return is<MDAST.FootnoteReference>(node, 'footnoteReference')
}

export function isTextDirective(node: MDAST.Node): node is MDAST.TextDirective {
  return is<MDAST.TextDirective>(node, 'textDirective')
}

export function isLeafDirective(node: MDAST.Node): node is MDAST.LeafDirective {
  return is<MDAST.LeafDirective>(node, 'leafDirective')
}

export function isContainerDirective(node: MDAST.Node): node is MDAST.ContainerDirective {
  return is<MDAST.ContainerDirective>(node, 'containerDirective')
}
