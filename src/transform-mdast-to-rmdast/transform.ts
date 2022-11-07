import * as MDAST from '@src/mdast-4.0.js'
import * as RMDAST from '@src/rmdast.js'
import * as MDAST_IS from '@mdast-utils/is.js'
import * as RMDAST_IS from '@rmdast-utils/is.js'
import * as Builder from '@rmdast-utils/builder.js'
import { findFootnoteDefinition } from './find-footnote-definition.js'
import { findDefinition } from './find-definition.js'
import { CustomError } from '@blackglory/errors'
import { isntUndefined } from 'extra-utils'

export class UnknownNodeError extends CustomError {
  constructor(node: MDAST.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformRoot(root: MDAST.Root): RMDAST.Root {
  return Builder.root(
    map(root.children, x => transformRootContent(x, root))
      .filter(RMDAST_IS.isUniversalBlockContent)
  )
}

function transformRootContent(
  node: MDAST.RootContent
, root: MDAST.Root
): RMDAST.UniversalBlockContent | RMDAST.UniversalInlineContent | RMDAST.ListItem | RMDAST.TableRow | RMDAST.TableCell | undefined {
  if (MDAST_IS.isFlowContent(node)) return transformFlowContent(node, root)
  if (MDAST_IS.isListContent(node)) return transformListContent(node, root)
  if (MDAST_IS.isPhrasingContent(node)) return transformPhrasingContent(node, root)
  if (MDAST_IS.isTableContent(node)) return transformTableContent(node, root)
  if (MDAST_IS.isRowContent(node)) return transformRowContent(node, root)
  throw new UnknownNodeError(node)
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
  throw new UnknownNodeError(node)
}

function transformContent(
  node: MDAST.Content
, root: MDAST.Root
): RMDAST.UniversalBlockContent | undefined {
  if (MDAST_IS.isDefinition(node)) return transformDefinition(node, root)
  if (MDAST_IS.isParagraph(node)) return transformParagraph(node, root)
  throw new UnknownNodeError(node)
}

function transformListContent(
  node: MDAST.ListContent
, root: MDAST.Root
): RMDAST.ListItem {
  if (MDAST_IS.isListItem(node)) return transformListItem(node, root)
  throw new UnknownNodeError(node)
}

function transformPhrasingContent(
  node: MDAST.PhrasingContent
, root: MDAST.Root
): RMDAST.UniversalInlineContent | undefined {
  if (MDAST_IS.isLink(node)) return transformLink(node, root)
  if (MDAST_IS.isLinkReference(node)) return transformLinkReference(node, root)
  if (MDAST_IS.isStaticPhrasingContent(node)) return transformStaticPhrasingContent(node, root)
  if (MDAST_IS.isTextDirective(node)) return transformTextDirective(node, root)
  throw new UnknownNodeError(node)
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
  throw new UnknownNodeError(node)
}

function transformTableContent(
  node: MDAST.TableContent
, root: MDAST.Root
): RMDAST.TableRow {
  if (MDAST_IS.isTableRow(node)) return transformTableRow(node, root)
  throw new UnknownNodeError(node)
}

function transformRowContent(node: MDAST.RowContent, root: MDAST.Root): RMDAST.TableCell {
  if (MDAST_IS.isTableCell(node)) return transformTableCell(node, root)
  throw new UnknownNodeError(node)
}

function transformParagraph(node: MDAST.Paragraph, root: MDAST.Root): RMDAST.Paragraph {
  return Builder.paragraph(
    map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformHeading(node: MDAST.Heading, root: MDAST.Root): RMDAST.Heading {
  return Builder.heading(
    node.depth
  , map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformThematicBreak(node: MDAST.ThematicBreak, root: MDAST.Root): RMDAST.ThematicBreak {
  return Builder.thematicBreak()
}

function transformBlockquote(node: MDAST.Blockquote, root: MDAST.Root): RMDAST.Blockquote {
  return Builder.blockquote(
    map(node.children, x => transformFlowContent(x, root))
  )
}

function transformList(node: MDAST.List, root: MDAST.Root): RMDAST.List {
  return Builder.list(
    map(node.children, x => transformListContent(x, root))
  , {
      ordered: node.ordered ?? null
    , spread: node.spread ?? null
    , start: node.start ?? null
    }
  )
}

function transformListItem(node: MDAST.ListItem, root: MDAST.Root): RMDAST.ListItem {
  return Builder.listItem(
    map(node.children, x => transformFlowContent(x, root))
  , {
      checked: node.checked ?? null
    , spread: node.spread ?? null
    }
  )
}

function transformHTML(node: MDAST.HTML, root: MDAST.Root): undefined {
  return undefined
}

function transformCode(node: MDAST.Code, root: MDAST.Root): RMDAST.Code {
  return Builder.code(
    node.value
  , {
      lang: node.lang ?? null
    , meta: node.meta ?? null
    }
  )
}

function transformDefinition(node: MDAST.Definition, root: MDAST.Root): undefined {
  return undefined
}

function transformText(node: MDAST.Text, root: MDAST.Root): RMDAST.Text {
  return Builder.text(node.value)
}

function transformEmphasis(node: MDAST.Emphasis, root: MDAST.Root): RMDAST.Emphasis {
  return Builder.emphasis(
    map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformStrong(node: MDAST.Strong, root: MDAST.Root): RMDAST.Strong {
  return Builder.strong(
    map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformInlineCode(
  node: MDAST.InlineCode
, root: MDAST.Root
): RMDAST.InlineCode {
  return Builder.inlineCode(node.value)
}

function transformBreak(node: MDAST.Break, root: MDAST.Root): RMDAST.Break {
  return Builder.brk()
}

function transformLink(node: MDAST.Link, root: MDAST.Root): RMDAST.Link {
  return Builder.link(
    node.url
  , map(node.children, x => transformStaticPhrasingContent(x, root))
  , { title: node.title ?? null }
  )
}

function transformImage(node: MDAST.Image, root: MDAST.Root): RMDAST.InlineImage {
  return Builder.inlineImage(
    node.url
  , {
      alt: node.alt ?? null
    , title: node.title ?? null
    }
  )
}

function transformLinkReference(node: MDAST.LinkReference, root: MDAST.Root): RMDAST.Link {
  const definition = findDefinition(root, node.identifier)
  return Builder.link(
    definition?.url ?? ''
  , map(node.children, x => transformStaticPhrasingContent(x, root))
  , { title: definition?.title ?? null }
  )
}

function transformImageReference(node: MDAST.ImageReference, root: MDAST.Root): RMDAST.InlineImage {
  const definition = findDefinition(root, node.identifier)
  return Builder.inlineImage(
    definition?.url ?? ''
  , {
      alt: node.alt ?? null
    , title: definition?.title ?? null
    }
  )
}

function transformTable(node: MDAST.Table, root: MDAST.Root): RMDAST.Table {
  const header = transformTableRow(node.children[0], root)
  const children = map(node.children.slice(1), x => transformTableRow(x, root)) 

  return Builder.table(
    header
  , children
  )
}

function transformTableRow(node: MDAST.TableRow, root: MDAST.Root): RMDAST.TableRow {
  return Builder.tableRow(
    map(node.children, x => transformRowContent(x, root))
  )
}

function transformTableCell(node: MDAST.TableCell, root: MDAST.Root): RMDAST.TableCell {
  return Builder.tableCell(
    map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformDelete(node: MDAST.Delete, root: MDAST.Root): RMDAST.Delete {
  return Builder.del(
    map(node.children, x => transformPhrasingContent(x, root))
  )
}

function transformFootnote(node: MDAST.Footnote, root: MDAST.Root): RMDAST.InlineFootnote {
  return Builder.inlineFootnote(
    map(node.children, x => transformPhrasingContent(x, root))
  )
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
  return Builder.footnote(
    map(definition?.children ?? [], x => transformFlowContent(x, root))
  )
}

function transformTextDirective(
  node: MDAST.TextDirective
, root: MDAST.Root
): RMDAST.TextDirective {
  return Builder.textDirective(
    node.name
  , map(node.children, x => transformPhrasingContent(x, root))
  , { attributes: node.attributes ?? {} }
  )
}

function transformLeafDirective(
  node: MDAST.LeafDirective
, root: MDAST.Root
): RMDAST.LeafDirective {
  return Builder.leafDirective(
    node.name
  , map(node.children, x => transformPhrasingContent(x, root))
  , { attributes: node.attributes ?? {} }
  )
}

function transformContainerDirective(
  node: MDAST.ContainerDirective
, root: MDAST.Root
): RMDAST.ContainerDirective {
  return Builder.containerDirective(
    node.name
  , map(node.children, x => transformFlowContent(x, root))
  , { attributes: node.attributes ?? {} }
  )
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
