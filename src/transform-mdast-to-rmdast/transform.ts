import * as MDAST from '@src/mdast-4.0.js'
import * as RMDAST from '@src/rmdast.js'
import * as MDAST_IS from '@src/mdast-utils/is.js'
import * as RMDAST_IS from '@src/rmdast-utils/is.js'
import { findFootnoteDefinition } from './find-footnote-definition.js'
import { findDefinition } from './find-definition.js'
import { CustomError } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'

export class UnknownNodeError extends CustomError {}

export function transformRoot(root: MDAST.Root): RMDAST.Root {
  return {
    type: 'root'
  , children: map(root.children, x => transformMdastContent(x, root))
                .filter(RMDAST_IS.isUniversalBlockContent)
  }
}

function transformMdastContent(
  node: MDAST.MdastContent
, root: MDAST.Root
): RMDAST.UniversalBlockContent | RMDAST.UniversalInlineContent | RMDAST.ListItem | RMDAST.TableRow | RMDAST.TableCell | undefined {
  if (MDAST_IS.isFlowContent(node)) return transformFlowContent(node, root)
  if (MDAST_IS.isListContent(node)) return transformListContent(node, root)
  if (MDAST_IS.isPhrasingContent(node)) return transformPhrasingContent(node, root)
  if (MDAST_IS.isTableContent(node)) return transformTableContent(node, root)
  if (MDAST_IS.isRowContent(node)) return transformRowContent(node, root)
  throw new UnknownNodeError()
}

function transformFlowContent(
  node: MDAST.FlowContent
, root: MDAST.Root
): RMDAST.UniversalBlockContent | undefined {
  if (MDAST_IS.isBlockquote(node)) return transformBlockquote(node, root)
  if (MDAST_IS.isCode(node)) return transformCode(node, root)
  if (MDAST_IS.isHeading(node)) return transformHeading(node, root)
  if (MDAST_IS.isHTML(node)) return transformHTML(node, root)
  if (MDAST_IS.isList(node)) return transformList(node, root)
  if (MDAST_IS.isThematicBreak(node)) return transformThematicBreak(node, root)
  if (MDAST_IS.isContent(node)) return transformContent(node, root)
  if (MDAST_IS.isTable(node)) return transformTable(node, root)
  if (MDAST_IS.isFootnoteDefinition(node)) return transformFootnoteDefinition(node, root)
  if (MDAST_IS.isLeafDirective(node)) return transformLeafDirective(node, root)
  if (MDAST_IS.isContainerDirective(node)) return transformContainerDirective(node, root)
  throw new UnknownNodeError()
}

function transformContent(
  node: MDAST.Content
, root: MDAST.Root
): RMDAST.UniversalBlockContent | undefined {
  if (MDAST_IS.isDefinition(node)) return transformDefinition(node, root)
  if (MDAST_IS.isParagraph(node)) return transformParagraph(node, root)
  throw new UnknownNodeError()
}

function transformListContent(node: MDAST.ListContent, root: MDAST.Root): RMDAST.ListItem {
  if (MDAST_IS.isListItem(node)) return transformListItem(node, root)
  throw new UnknownNodeError()
}

function transformPhrasingContent(
  node: MDAST.PhrasingContent
, root: MDAST.Root
): RMDAST.UniversalInlineContent | undefined {
  if (MDAST_IS.isLink(node)) return transformLink(node, root)
  if (MDAST_IS.isLinkReference(node)) return transformLinkReference(node, root)
  if (MDAST_IS.isStaticPhrasingContent(node)) return transformStaticPhrasingContent(node, root)
  if (MDAST_IS.isTextDirective(node)) return transformTextDirective(node, root)
  throw new UnknownNodeError()
}

function transformStaticPhrasingContent(
  node: MDAST.StaticPhrasingContent
, root: MDAST.Root
): RMDAST.UniversalInlineContent | undefined {
  if (MDAST_IS.isBreak(node)) return transformBreak(node, root)
  if (MDAST_IS.isEmphasis(node)) return transformEmphasis(node, root)
  if (MDAST_IS.isHTML(node)) return transformHTML(node, root)
  if (MDAST_IS.isImage(node)) return transformImage(node, root)
  if (MDAST_IS.isImageReference(node)) return transformImageReference(node, root)
  if (MDAST_IS.isInlineCode(node)) return transformInlineCode(node, root)
  if (MDAST_IS.isStrong(node)) return transformStrong(node, root)
  if (MDAST_IS.isText(node)) return transformText(node, root)
  if (MDAST_IS.isDelete(node)) return transformDelete(node, root)
  if (MDAST_IS.isFootnote(node)) return transformFootnote(node, root)
  if (MDAST_IS.isFootnoteReference(node)) return transformFootnoteReference(node, root)
  throw new UnknownNodeError()
}

function transformTableContent(
  node: MDAST.TableContent
, root: MDAST.Root
): RMDAST.TableRow {
  if (MDAST_IS.isTableRow(node)) return transformTableRow(node, root)
  throw new UnknownNodeError()
}

function transformRowContent(node: MDAST.RowContent, root: MDAST.Root): RMDAST.TableCell {
  if (MDAST_IS.isTableCell(node)) return transformTableCell(node, root)
  throw new UnknownNodeError()
}

function transformParagraph(node: MDAST.Paragraph, root: MDAST.Root): RMDAST.Paragraph {
  return {
    type: 'paragraph'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformHeading(node: MDAST.Heading, root: MDAST.Root): RMDAST.Heading {
  return {
    type: 'heading'
  , depth: node.depth
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformThematicBreak(node: MDAST.ThematicBreak, root: MDAST.Root): RMDAST.ThematicBreak {
  return {
    type: 'thematicBreak'
  }
}

function transformBlockquote(node: MDAST.Blockquote, root: MDAST.Root): RMDAST.Blockquote {
  return {
    type: 'blockquote'
  , children: map(node.children, x => transformFlowContent(x, root))
  }
}

function transformList(node: MDAST.List, root: MDAST.Root): RMDAST.List {
  return {
    type: 'list'
  , ordered: node.ordered ?? null
  , spread: node.spread ?? null
  , start: node.start ?? null
  , children: map(node.children, x => transformListContent(x, root))
  }
}

function transformListItem(node: MDAST.ListItem, root: MDAST.Root): RMDAST.ListItem {
  return {
    type: 'listItem'
  , checked: node.checked ?? null
  , spread: node.spread ?? null
  , children: map(node.children, x => transformFlowContent(x, root))
  }
}

function transformHTML(node: MDAST.HTML, root: MDAST.Root): undefined {
  return undefined
}

function transformCode(node: MDAST.Code, root: MDAST.Root): RMDAST.Code {
  return {
    type: 'code'
  , lang: node.lang ?? null
  , meta: node.meta ?? null
  , value: node.value
  }
}

function transformDefinition(node: MDAST.Definition, root: MDAST.Root): undefined {
  return undefined
}

function transformText(node: MDAST.Text, root: MDAST.Root): RMDAST.Text {
  return {
    type: 'text'
  , value: node.value
  }
}

function transformEmphasis(node: MDAST.Emphasis, root: MDAST.Root): RMDAST.Emphasis {
  return {
    type: 'emphasis'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformStrong(node: MDAST.Strong, root: MDAST.Root): RMDAST.Strong {
  return {
    type: 'strong'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformInlineCode(node: MDAST.InlineCode, root: MDAST.Root): RMDAST.InlineCode {
  return {
    type: 'inlineCode'
  , value: node.value
  }
}

function transformBreak(node: MDAST.Break, root: MDAST.Root): RMDAST.Break {
  return {
    type: 'break'
  }
}

function transformLink(node: MDAST.Link, root: MDAST.Root): RMDAST.Link {
  return {
    type: 'link'
  , url: node.url
  , title: node.title ?? null
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
}

function transformImage(node: MDAST.Image, root: MDAST.Root): RMDAST.InlineImage {
  return {
    type: 'inlineImage'
  , url: node.url
  , alt: node.alt ?? null
  , title: node.title ?? null
  }
}

function transformLinkReference(node: MDAST.LinkReference, root: MDAST.Root): RMDAST.Link {
  const definition = findDefinition(root, node.identifier)
  return {
    type: 'link'
  , url: definition?.url ?? ''
  , title: definition?.title ?? null
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
}

function transformImageReference(node: MDAST.ImageReference, root: MDAST.Root): RMDAST.InlineImage {
  const definition = findDefinition(root, node.identifier)
  return {
    type: 'inlineImage'
  , url: definition?.url ?? ''
  , alt: node.alt ?? null
  , title: definition?.title ?? null
  }
}

function transformTable(node: MDAST.Table, root: MDAST.Root): RMDAST.Table {
  const header = transformTableRow(node.children[0], root)
  const children = map(node.children.slice(1), x => transformTableRow(x, root)) 

  return {
    type: 'table'
  , header
  , children
  }
}

function transformTableRow(node: MDAST.TableRow, root: MDAST.Root): RMDAST.TableRow {
  return {
    type: 'tableRow'
  , children: map(node.children, x => transformRowContent(x, root))
  }
}

function transformTableCell(node: MDAST.TableCell, root: MDAST.Root): RMDAST.TableCell {
  return {
    type: 'tableCell'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformDelete(node: MDAST.Delete, root: MDAST.Root): RMDAST.Delete {
  return {
    type: 'delete'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformFootnote(node: MDAST.Footnote, root: MDAST.Root): RMDAST.InlineFootnote {
  return {
    type: 'inlineFootnote'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformFootnoteDefinition(
  node: MDAST.FootnoteDefinition
, root: MDAST.Root
): undefined {
  return undefined
}

function transformFootnoteReference(
  node: MDAST.FootnoteReference
, root: MDAST.Root
): RMDAST.Footnote {
  const definition = findFootnoteDefinition(root, node.identifier)
  return {
    type: 'footnote'
  , children: map(definition?.children ?? [], x => transformFlowContent(x, root))
  }
}

function transformTextDirective(
  node: MDAST.TextDirective
, root: MDAST.Root
): RMDAST.TextDirective {
  return {
    type: 'textDirective'
  , name: node.name
  , attributes: node.attributes ?? {}
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformLeafDirective(
  node: MDAST.LeafDirective
, root: MDAST.Root
): RMDAST.LeafDirective {
  return {
    type: 'leafDirective'
  , name: node.name
  , attributes: node.attributes ?? {}
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformContainerDirective(
  node: MDAST.ContainerDirective
, root: MDAST.Root
): RMDAST.ContainerDirective {
  return {
    type: 'containerDirective'
  , name: node.name
  , attributes: node.attributes ?? {}
  , children: map(node.children, x => transformFlowContent(x, root))
  }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
