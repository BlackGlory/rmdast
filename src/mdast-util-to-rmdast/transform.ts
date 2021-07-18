import * as MDAST from '@src/mdast-3.0'
import * as RMDAST from '@src/rmdast-1.0'
import { getFootnoteDefinition } from './get-footnote-definition'
import { getDefinition } from './get-definition'
import { CustomError } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'
import { is } from 'unist-util-is'

export class UnknownNodeError extends CustomError {}

export function transformRoot(root: MDAST.Root): RMDAST.Root {
  return {
    type: 'root'
  , children: map(root.children, x => transformContent(x, root))
  }
}

function transformContent(node: MDAST.Content, root: MDAST.Root): RMDAST.Content | undefined {
  if (isTopLevelContent(node)) return transformTopLevelContent(node, root)
  if (isListContent(node)) return transformListContent(node, root)
  if (isTableContent(node)) return transformTableContent(node, root)
  if (isRowContent(node)) return transformRowContent(node, root)
  if (isPhrasingContent(node)) return transformPhrasingContent(node, root)
  throw new UnknownNodeError()
}

function transformTopLevelContent(node: MDAST.TopLevelContent, root: MDAST.Root): RMDAST.TopLevelContent | undefined {
  if (isBlockContent(node)) return transformBlockContent(node, root)
  if (isFrontmatterContent(node)) return transformFrontmatterContent(node, root)
  if (isDefinitionContent(node)) return transformDefinitionContent(node, root)
  throw new UnknownNodeError()
}

function transformListContent(node: MDAST.ListContent, root: MDAST.Root): RMDAST.ListContent {
  if (isListContent(node)) return transformListItem(node, root)
  throw new UnknownNodeError()
}

function transformTableContent(node: MDAST.TableContent, root: MDAST.Root): RMDAST.TableContent {
  if (isTableRow(node)) return transformTableRow(node, root)
  throw new UnknownNodeError()
}

function transformRowContent(node: MDAST.RowContent, root: MDAST.Root): RMDAST.RowContent {
  if (isTableCell(node)) return transformTableCell(node, root)
  throw new UnknownNodeError()
}

function transformPhrasingContent(node: MDAST.PhrasingContent, root: MDAST.Root): RMDAST.PhrasingContent | undefined {
  if (isStaticPhrasingContent(node)) return transformStaticPhrasingContent(node, root)
  if (isLink(node)) return transformLink(node, root)
  if (isLinkReference(node)) return transformLinkReference(node, root)
  throw new UnknownNodeError()
}

function transformBlockContent(node: MDAST.BlockContent, root: MDAST.Root): RMDAST.BlockContent | undefined {
  if (isParagraph(node)) return transformParagraph(node, root)
  if (isHeading(node)) return transformHeading(node, root)
  if (isThematicBreak(node)) return transformThematicBreak(node, root)
  if (isBlockquote(node)) return transformBlockquote(node, root)
  if (isList(node)) return transformList(node, root)
  if (isTable(node)) return transformTable(node, root)
  if (isHTML(node)) return transformHTML(node, root)
  if (isCode(node)) return transformCode(node, root)
  throw new UnknownNodeError()
}

function transformHTML(node: MDAST.HTML, root: MDAST.Root): undefined {
  return undefined
}

function transformDefinitionContent(node: MDAST.DefinitionContent, root: MDAST.Root) {
  if (isDefinition(node)) return transformDefinition(node, root)
  if (isFootnoteDefinition(node)) return transformFootnoteDefinition(node, root)
  throw new UnknownNodeError()
}

function transformStaticPhrasingContent(node: MDAST.StaticPhrasingContent, root: MDAST.Root): RMDAST.StaticPhrasingContent | undefined {
  if (isText(node)) return transformText(node, root)
  if (isEmphasis(node)) return transformEmphasis(node, root)
  if (isStrong(node)) return transformStrong(node, root)
  if (isDelete(node)) return transformDelete(node, root)
  if (isHTML(node)) return transformHTML(node, root)
  if (isInlineCode(node)) return transformInlineCode(node, root)
  if (isBreak(node)) return transformBreak(node, root)
  if (isImage(node)) return transformImage(node, root)
  if (isImageReference(node)) return transformImageReference(node, root)
  if (isFootnote(node)) return transformFootnote(node, root)
  if (isFootnoteReference(node)) return transformFootnoteReference(node, root)
  throw new UnknownNodeError()
}

function transformFrontmatterContent(node: MDAST.FrontmatterContent, root: MDAST.Root): undefined {
  return undefined
}

function transformListItem(node: MDAST.ListItem, root: MDAST.Root): RMDAST.ListItem {
  return {
    type: 'listItem'
  , checked: node.checked ?? null
  , spread: node.spread ?? null
  , children: map(node.children, x => transformBlockContent(x, root))
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

function transformLink(node: MDAST.Link, root: MDAST.Root): RMDAST.Link {
  return {
    type: 'link'
  , url: node.url
  , title: node.title ?? null
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
}

function transformLinkReference(node: MDAST.LinkReference, root: MDAST.Root): RMDAST.Link {
  const definition = getDefinition(root, node.identifier)
  return {
    type: 'link'
  , url: definition?.url ?? ''
  , title: definition?.title ?? null
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
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
  , children: map(node.children, x => transformBlockContent(x, root))
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

function transformTable(node: MDAST.Table, root: MDAST.Root): RMDAST.Table {
  return {
    type: 'table'
  , align: node.align ?? null
  , children: map(node.children, x => transformTableContent(x, root))
  }
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

function transformFootnoteDefinition(node: MDAST.FootnoteDefinition, root: MDAST.Root): undefined {
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

function transformDelete(node: MDAST.Delete, root: MDAST.Root): RMDAST.Delete {
  return {
    type: 'delete'
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

function transformImage(node: MDAST.Image, root: MDAST.Root): RMDAST.Image {
  return {
    type: 'image'
  , url: node.url
  , alt: node.alt ?? null
  , title: node.title ?? null
  }
}

function transformImageReference(node: MDAST.ImageReference, root: MDAST.Root): RMDAST.Image {
  const definition = getDefinition(root, node.identifier)
  return {
    type: 'image'
  , url: definition?.url ?? ''
  , alt: node.alt ?? null
  , title: definition?.title ?? null
  }
}

function transformFootnote(node: MDAST.Footnote, root: MDAST.Root): RMDAST.Footnote {
  return {
    type: 'footnote'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformFootnoteReference(node: MDAST.FootnoteReference, root: MDAST.Root): RMDAST.Footnote {
  const definition = getFootnoteDefinition(root, node.identifier)
  return {
    type: 'footnote'
  , children: map(definition?.children ?? [], x => transformBlockContent(x, root))
  }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}

function isTopLevelContent(node: MDAST.Node): node is MDAST.TopLevelContent {
  return isBlockContent(node)
      || isFrontmatterContent(node)
      || isDefinitionContent(node)
}

function isListContent(node: MDAST.Node): node is MDAST.ListContent {
  return isListItem(node)
}

function isTableContent(node: MDAST.Node): node is MDAST.TableContent {
  return isTableRow(node)
}

function isRowContent(node: MDAST.Node): node is MDAST.RowContent {
  return isTableCell(node)
}

function isPhrasingContent(node: MDAST.Node): node is MDAST.PhrasingContent {
  return isStaticPhrasingContent(node)
      || isLink(node)
      || isLinkReference(node)
}

function isBlockContent(node: MDAST.Node): node is MDAST.BlockContent {
  return isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isTable(node)
      || isHTML(node)
      || isCode(node)
}

function isFrontmatterContent(node: MDAST.Node): node is MDAST.FrontmatterContent {
  return isYAML(node)
}

function isDefinitionContent(node: MDAST.Node): node is MDAST.DefinitionContent {
  return isDefinition(node)
      || isFootnoteDefinition(node)
}

function isListItem(node: MDAST.Node): node is MDAST.ListItem {
  return is<MDAST.ListItem>(node, 'listItem')
}

function isTableRow(node: MDAST.Node): node is MDAST.TableRow {
  return is<MDAST.TableRow>(node, 'tableRow')
}

function isTableCell(node: MDAST.Node): node is MDAST.TableCell {
  return is<MDAST.TableCell>(node, 'tableCell')
}

function isStaticPhrasingContent(node: MDAST.Node): node is MDAST.StaticPhrasingContent {
  return isText(node)
      || isEmphasis(node)
      || isStrong(node)
      || isDelete(node)
      || isHTML(node)
      || isInlineCode(node)
      || isBreak(node)
      || isImage(node)
      || isImageReference(node)
      || isFootnote(node)
      || isFootnoteReference(node)
}

function isLink(node: MDAST.Node): node is MDAST.Link {
  return is<MDAST.Link>(node, 'link')
}

function isLinkReference(node: MDAST.Node): node is MDAST.LinkReference {
  return is<MDAST.LinkReference>(node, 'linkReference')
}

function isParagraph(node: MDAST.Node): node is MDAST.Paragraph {
  return is<MDAST.Paragraph>(node, 'paragraph')
}

function isHeading(node: MDAST.Node): node is MDAST.Heading {
  return is<MDAST.Heading>(node, 'heading')
}

function isThematicBreak(node: MDAST.Node): node is MDAST.ThematicBreak {
  return is<MDAST.ThematicBreak>(node, 'thematicBreak')
}

function isBlockquote(node: MDAST.Node): node is MDAST.Blockquote {
  return is<MDAST.Blockquote>(node, 'blockquote')
}

function isList(node: MDAST.Node): node is MDAST.List {
  return is<MDAST.List>(node, 'list')
}

function isTable(node: MDAST.Node): node is MDAST.Table {
  return is<MDAST.Table>(node, 'table')
}

function isHTML(node: MDAST.Node): node is MDAST.HTML {
  return is<MDAST.HTML>(node, 'html')
}

function isCode(node: MDAST.Node): node is MDAST.Code {
  return is<MDAST.Code>(node, 'code')
}

function isYAML(node: MDAST.Node): node is MDAST.YAML {
  return is<MDAST.YAML>(node, 'yaml')
}

function isDefinition(node: MDAST.Node): node is MDAST.Definition {
  return is<MDAST.Definition>(node, 'definition')
}

function isFootnoteDefinition(node: MDAST.Node): node is MDAST.FootnoteDefinition {
  return is<MDAST.FootnoteDefinition>(node, 'footnoteDefinition')
}

function isText(node: MDAST.Node): node is MDAST.Text {
  return is<MDAST.Text>(node, 'text')
}

function isEmphasis(node: MDAST.Node): node is MDAST.Emphasis {
  return is<MDAST.Emphasis>(node, 'emphasis')
}

function isDelete(node: MDAST.Node): node is MDAST.Delete {
  return is<MDAST.Delete>(node, 'delete')
}

function isStrong(node: MDAST.Node): node is MDAST.Strong {
  return is<MDAST.Strong>(node, 'strong')
}

function isInlineCode(node: MDAST.Node): node is MDAST.InlineCode {
  return is<MDAST.InlineCode>(node, 'inlineCode')
}

function isBreak(node: MDAST.Node): node is MDAST.Break {
  return is<MDAST.Break>(node, 'break')
}

function isImage(node: MDAST.Node): node is MDAST.Image {
  return is<MDAST.Image>(node, 'image')
}

function isImageReference(node: MDAST.Node): node is MDAST.ImageReference {
  return is<MDAST.ImageReference>(node, 'imageReference')
}

function isFootnote(node: MDAST.Node): node is MDAST.Footnote {
  return is<MDAST.Footnote>(node, 'footnote')
}

function isFootnoteReference(node: MDAST.Node): node is MDAST.FootnoteReference {
  return is<MDAST.FootnoteReference>(node, 'footnoteReference')
}
