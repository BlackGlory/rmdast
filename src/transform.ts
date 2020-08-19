import { Node } from 'unist'
import is = require('unist-util-is')
import * as MDAST from 'mdast'
import * as AST from '@src/ast'
import definitions = require('mdast-util-definitions')
import { isDefined } from 'ts-is-present'
import { getFootnoteDefinition } from './get-footnote-definitions'

export function transform(root: MDAST.Root): AST.Root {
  return {
    type: 'root'
  , children: map(root.children, x => transformContent(x, root))
  }
}

function transformContent(node: MDAST.Content, root: MDAST.Root): AST.Content | undefined {
  if (isTopLevelContent(node)) return transformTopLevelContent(node, root)
  if (isListContent(node)) return transformListContent(node, root)
  if (isTableContent(node)) return transformTableContent(node, root)
  if (isRowContent(node)) return transformRowContent(node, root)
  if (isPhrasingContent(node)) return transformPhrasingContent(node, root)
  throw new UnknownNodeError()
}

function isTopLevelContent(node: Node): node is MDAST.TopLevelContent {
  return isBlockContent(node)
      || isFrontmatterContent(node)
      || isDefinitionContent(node)
}

function isListContent(node: Node): node is MDAST.ListContent {
  return isListItem(node)
}

function isTableContent(node: Node): node is MDAST.TableContent {
  return isTableRow(node)
}

function isRowContent(node: Node): node is MDAST.RowContent {
  return isTableCell(node)
}

function isPhrasingContent(node: Node): node is MDAST.PhrasingContent {
  return isStaticPhrasingContent(node)
      || isLink(node)
      || isLinkReference(node)
}

function isBlockContent(node: Node): node is MDAST.BlockContent {
  return isParagraph(node)
      || isHeading(node)
      || isThematicBreak(node)
      || isBlockquote(node)
      || isList(node)
      || isTable(node)
      || isHTML(node)
      || isCode(node)
}

function isFrontmatterContent(node: Node): node is MDAST.FrontmatterContent {
  return isYAML(node)
}

function isDefinitionContent(node: Node): node is MDAST.DefinitionContent {
  return isDefinition(node)
      || isFootnoteDefinition(node)
}

function isListItem(node: Node): node is MDAST.ListItem {
  return is<MDAST.ListItem>(node, 'listItem')
}

function isTableRow(node: Node): node is MDAST.TableRow {
  return is<MDAST.TableRow>(node, 'tableRow')
}

function isTableCell(node: Node): node is MDAST.TableCell {
  return is<MDAST.TableCell>(node, 'tableCell')
}

function isStaticPhrasingContent(node: Node): node is MDAST.StaticPhrasingContent {
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

function isLink(node: Node): node is MDAST.Link {
  return is<MDAST.Link>(node, 'link')
}

function isLinkReference(node: Node): node is MDAST.LinkReference {
  return is<MDAST.LinkReference>(node, 'linkReference')
}

function isParagraph(node: Node): node is MDAST.Paragraph {
  return is<MDAST.Paragraph>(node, 'paragraph')
}

function isHeading(node: Node): node is MDAST.Heading {
  return is<MDAST.Heading>(node, 'heading')
}

function isThematicBreak(node: Node): node is MDAST.ThematicBreak {
  return is<MDAST.ThematicBreak>(node, 'thematicBreak')
}

function isBlockquote(node: Node): node is MDAST.Blockquote {
  return is<MDAST.Blockquote>(node, 'blockquote')
}

function isList(node: Node): node is MDAST.List {
  return is<MDAST.List>(node, 'list')
}

function isTable(node: Node): node is MDAST.Table {
  return is<MDAST.Table>(node, 'table')
}

function isHTML(node: Node): node is MDAST.HTML {
  return is<MDAST.HTML>(node, 'html')
}

function isCode(node: Node): node is MDAST.Code {
  return is<MDAST.Code>(node, 'code')
}

function isYAML(node: Node): node is MDAST.YAML {
  return is<MDAST.YAML>(node, 'yaml')
}

function isDefinition(node: Node): node is MDAST.Definition {
  return is<MDAST.Definition>(node, 'definition')
}

function isFootnoteDefinition(node: Node): node is MDAST.FootnoteDefinition {
  return is<MDAST.FootnoteDefinition>(node, 'footnoteDefinition')
}

function isText(node: Node): node is MDAST.Text {
  return is<MDAST.Text>(node, 'text')
}

function isEmphasis(node: Node): node is MDAST.Emphasis {
  return is<MDAST.Emphasis>(node, 'emphasis')
}

function isDelete(node: Node): node is MDAST.Delete {
  return is<MDAST.Delete>(node, 'delete')
}

function isStrong(node: Node): node is MDAST.Strong {
  return is<MDAST.Strong>(node, 'strong')
}

function isInlineCode(node: Node): node is MDAST.InlineCode {
  return is<MDAST.InlineCode>(node, 'inlineCode')
}

function isBreak(node: Node): node is MDAST.Break {
  return is<MDAST.Break>(node, 'break')
}

function isImage(node: Node): node is MDAST.Image {
  return is<MDAST.Image>(node, 'image')
}

function isImageReference(node: Node): node is MDAST.ImageReference {
  return is<MDAST.ImageReference>(node, 'imageReference')
}

function isFootnote(node: Node): node is MDAST.Footnote {
  return is<MDAST.Footnote>(node, 'footnote')
}

function isFootnoteReference(node: Node): node is MDAST.FootnoteReference {
  return is<MDAST.FootnoteReference>(node, 'footnoteReference')
}

function transformTopLevelContent(node: MDAST.TopLevelContent, root: MDAST.Root): AST.TopLevelContent | undefined {
  if (isBlockContent(node)) return transformBlockContent(node, root)
  if (isFrontmatterContent(node)) return transformFrontmatterContent(node, root)
  if (isDefinitionContent(node)) return transformDefinitionContent(node, root)
  throw new UnknownNodeError()
}

function transformListContent(node: MDAST.ListContent, root: MDAST.Root): AST.ListContent {
  if (isListContent(node)) return transformListItem(node, root)
  throw new UnknownNodeError()
}

function transformTableContent(node: MDAST.TableContent, root: MDAST.Root): AST.TableContent {
  if (isTableRow(node)) return transformTableRow(node, root)
  throw new UnknownNodeError()
}

function transformRowContent(node: MDAST.RowContent, root: MDAST.Root): AST.RowContent {
  if (isTableCell(node)) return transformTableCell(node, root)
  throw new UnknownNodeError()
}

function transformPhrasingContent(node: MDAST.PhrasingContent, root: MDAST.Root): AST.PhrasingContent | undefined {
  if (isStaticPhrasingContent(node)) return transformStaticPhrasingContent(node, root)
  if (isLink(node)) return transformLink(node, root)
  if (isLinkReference(node)) return transformLinkReference(node, root)
  throw new UnknownNodeError()
}

function transformBlockContent(node: MDAST.BlockContent, root: MDAST.Root): AST.BlockContent {
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

function transformFrontmatterContent(node: MDAST.FrontmatterContent, root: MDAST.Root): undefined {
  return undefined
}

function transformDefinitionContent(node: MDAST.DefinitionContent, root: MDAST.Root) {
  if (isDefinition(node)) return transformDefinition(node, root)
  if (isFootnoteDefinition(node)) return transformFootnoteDefinition(node, root)
  throw new UnknownNodeError()
}

function transformListItem(node: MDAST.ListItem, root: MDAST.Root): AST.ListItem {
  return {
    type: 'listItem'
  , checked: node.checked
  , spread: node.spread
  , children: map(node.children, x => transformBlockContent(x, root))
  }
}

function transformTableRow(node: MDAST.TableRow, root: MDAST.Root): AST.TableRow {
  return {
    type: 'tableRow'
  , children: map(node.children, x => transformRowContent(x, root))
  }
}

function transformTableCell(node: MDAST.TableCell, root: MDAST.Root): AST.TableCell {
  return {
    type: 'tableCell'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformStaticPhrasingContent(node: MDAST.StaticPhrasingContent, root: MDAST.Root): AST.StaticPhrasingContent | undefined {
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

function transformLink(node: MDAST.Link, root: MDAST.Root): AST.Link {
  return {
    type: 'link'
  , url: node.url
  , title: node.title
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
}

function transformLinkReference(node: MDAST.LinkReference, root: MDAST.Root): AST.Link {
  const definition = definitions(root)(node.identifier)
  return {
    type: 'link'
  , url: definition?.url ?? ''
  , title: definition?.title
  , children: map(node.children, x => transformStaticPhrasingContent(x, root))
  }
}

function transformParagraph(node: MDAST.Paragraph, root: MDAST.Root): AST.Paragraph {
  return {
    type: 'paragraph'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformHeading(node: MDAST.Heading, root: MDAST.Root): AST.Heading {
  return {
    type: 'heading'
  , depth: node.depth
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformThematicBreak(node: MDAST.ThematicBreak, root: MDAST.Root): AST.ThematicBreak {
  return {
    type: 'thematicBreak'
  }
}

function transformBlockquote(node: MDAST.Blockquote, root: MDAST.Root): AST.Blockquote {
  return {
    type: 'blockquote'
  , children: map(node.children, x => transformBlockContent(x, root))
  }
}

function transformList(node: MDAST.List, root: MDAST.Root): AST.List {
  return {
    type: 'list'
  , ordered: node.ordered
  , spread: node.spread
  , start: node.start
  , children: map(node.children, x => transformListContent(x, root))
  }
}

function transformTable(node: MDAST.Table, root: MDAST.Root): AST.Table {
  return {
    type: 'table'
  , align: node.align
  , children: map(node.children, x => transformTableContent(x, root))
  }
}

function transformHTML(node: MDAST.HTML, root: MDAST.Root): AST.HTML {
  return {
    type: 'html'
  , value: node.value
  }
}

function transformCode(node: MDAST.Code, root: MDAST.Root): AST.Code {
  return {
    type: 'code'
  , lang: node.lang
  , meta: node.meta
  , value: node.value
  }
}

function transformDefinition(node: MDAST.Definition, root: MDAST.Root): undefined {
  return undefined
}

function transformFootnoteDefinition(node: MDAST.FootnoteDefinition, root: MDAST.Root): undefined {
  return undefined
}

function transformText(node: MDAST.Text, root: MDAST.Root): AST.Text {
  return {
    type: 'text'
  , value: node.value
  }
}

function transformEmphasis(node: MDAST.Emphasis, root: MDAST.Root): AST.Emphasis {
  return {
    type: 'emphasis'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformStrong(node: MDAST.Strong, root: MDAST.Root): AST.Strong {
  return {
    type: 'strong'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformDelete(node: MDAST.Delete, root: MDAST.Root): AST.Delete {
  return {
    type: 'delete'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformInlineCode(node: MDAST.InlineCode, root: MDAST.Root): AST.InlineCode {
  return {
    type: 'inlineCode'
  , value: node.value
  }
}

function transformBreak(node: MDAST.Break, root: MDAST.Root): AST.Break {
  return {
    type: 'break'
  }
}

function transformImage(node: MDAST.Image, root: MDAST.Root): AST.Image {
  return {
    type: 'image'
  , alt: node.alt
  , title: node.title
  , url: node.url
  }
}

function transformImageReference(node: MDAST.ImageReference, root: MDAST.Root): AST.Image {
  const definition = definitions(root)(node.identifier)
  return {
    type: 'image'
  , url: definition?.url ?? ''
  , alt: node.alt
  , title: definition?.title
  }
}

function transformFootnote(node: MDAST.Footnote, root: MDAST.Root): AST.Footnote {
  return {
    type: 'footnote'
  , children: map(node.children, x => transformPhrasingContent(x, root))
  }
}

function transformFootnoteReference(node: MDAST.FootnoteReference, root: MDAST.Root): AST.Footnote {
  const definition = getFootnoteDefinition(root, node.identifier)
  return {
    type: 'footnote'
  , children: map(definition?.children ?? [], x => transformBlockContent(x, root))
  }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr.map(x => fn(x)).filter(isDefined)
}

class UnknownNodeError extends Error {
  name = this.constructor.name
}
