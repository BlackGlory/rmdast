import * as MDAST from '@src/mdast-4.0.js'

export function root(children: MDAST.Root['children']): MDAST.Root {
  return {
    type: 'root'
  , children
  }
}

export function paragraph(children: MDAST.Paragraph['children']): MDAST.Paragraph {
  return {
    type: 'paragraph'
  , children
  }
}

export function heading(depth: MDAST.Heading['depth'], children: MDAST.Heading['children']): MDAST.Heading {
  return {
    type: 'heading'
  , depth
  , children
  }
}

export function thematicBreak(): MDAST.ThematicBreak {
  return { type: 'thematicBreak' }
}

export function blockquote(children: MDAST.Blockquote['children']): MDAST.Blockquote {
  return {
    type: 'blockquote'
  , children
  }
}

export function list(
  children: MDAST.List['children']
, { ordered, start, spread }: Pick<MDAST.List, 'ordered' | 'start' | 'spread'> = {}
): MDAST.List {
  return {
    type: 'list'
  , ordered
  , start
  , spread
  , children
  }
}

export function listItem(
  children: MDAST.ListItem['children']
, { checked, spread }: Pick<MDAST.ListItem, 'checked' | 'spread'> = {}
): MDAST.ListItem {
  return {
    type: 'listItem'
  , checked
  , spread
  , children
  }
}

export function html(value: MDAST.HTML['value']): MDAST.HTML {
  return {
    type: 'html'
  , value
  }
}

export function code(
  value: MDAST.Code['value']
, { lang, meta }: Pick<MDAST.Code, 'lang' | 'meta'> = {}
): MDAST.Code {
  return {
    type: 'code'
  , lang
  , meta
  , value
  }
}

export function definition(
  identifier: MDAST.Definition['identifier']
, url: MDAST.Definition['url']
, { title, label }: Pick<MDAST.Definition, 'title' | 'label'> = {}
): MDAST.Definition {
  return {
    type: 'definition'
  , identifier
  , url
  , title
  , label
  }
}

export function text(value: MDAST.Text['value']): MDAST.Text {
  return {
    type: 'text'
  , value
  }
}

export function emphasis(children: MDAST.Emphasis['children']): MDAST.Emphasis {
  return {
    type: 'emphasis'
  , children
  }
}

export function strong(children: MDAST.Strong['children']): MDAST.Strong {
  return {
    type: 'strong'
  , children
  }
}

export function inlineCode(value: MDAST.InlineCode['value']): MDAST.InlineCode {
  return {
    type: 'inlineCode'
  , value
  }
}

export function brk(): MDAST.Break {
  return { type: 'break' }
}

export function link(
  url: MDAST.Link['url']
, children: MDAST.Link['children']
, { title }: Pick<MDAST.Link, 'title'> = {}
): MDAST.Link {
  return {
    type: 'link'
  , url
  , children
  , title
  }
}

export function image(
  url: MDAST.Image['url']
, { title, alt }: Pick<MDAST.Image, 'title' | 'alt'> = {}
): MDAST.Image {
  return {
    type: 'image'
  , url
  , title
  , alt
  }
}

export function linkReference(
  identifier: MDAST.LinkReference['identifier']
, referenceType: MDAST.LinkReference['referenceType']
, children: MDAST.LinkReference['children']
): MDAST.LinkReference {
  return {
    type: 'linkReference'
  , identifier
  , children
  , referenceType
  }
}

export function imageReference(
  identifier: MDAST.ImageReference['identifier']
, referenceType: MDAST.ImageReference['referenceType']
, { alt, label }: Pick<MDAST.ImageReference, 'alt' | 'label'> = {}
): MDAST.ImageReference {
  return {
    type: 'imageReference'
  , identifier
  , referenceType
  , alt
  , label
  }
}

export function table(
  children: MDAST.Table['children']
, { align }: Pick<MDAST.Table, 'align'> = {}
): MDAST.Table {
  return {
    type: 'table'
  , align
  , children
  }
}

export function tableRow(children: MDAST.TableRow['children']): MDAST.TableRow {
  return {
    type: 'tableRow'
  , children
  }
}

export function tableCell(children: MDAST.TableCell['children']): MDAST.TableCell {
  return {
    type: 'tableCell'
  , children
  }
}

export function del(children: MDAST.Delete['children']): MDAST.Delete {
  return {
    type: 'delete'
  , children
  }
}

export function footnote(children: MDAST.Footnote['children']): MDAST.Footnote {
  return {
    type: 'footnote'
  , children
  }
}

export function footnoteDefinition(
  identifier: MDAST.FootnoteDefinition['identifier']
, children: MDAST.FootnoteDefinition['children']
, { label }: Pick<MDAST.FootnoteDefinition, 'label'> = {}
): MDAST.FootnoteDefinition {
  return {
    type: 'footnoteDefinition'
  , children
  , identifier
  , label
  }
}

export function footnoteReference(
  identifier: MDAST.FootnoteReference['identifier']
, { label }: Pick<MDAST.FootnoteReference, 'label'> = {}
): MDAST.FootnoteReference {
  return {
    type: 'footnoteReference'
  , identifier
  , label
  }
}

export function textDirective(
  name: MDAST.TextDirective['name']
, children: MDAST.TextDirective['children']
, { attributes }: Pick<MDAST.TextDirective, 'attributes'> = {}
): MDAST.TextDirective {
  return {
    type: 'textDirective'
  , name
  , children
  , attributes
  }
}

export function leafDirective(
  name: MDAST.LeafDirective['name']
, children: MDAST.LeafDirective['children']
, { attributes }: Pick<MDAST.LeafDirective, 'attributes'> = {}
): MDAST.LeafDirective {
  return {
    type: 'leafDirective'
  , name
  , children
  , attributes
  }
}

export function containerDirective(
  name: MDAST.ContainerDirective['name']
, children: MDAST.ContainerDirective['children']
, { attributes }: Pick<MDAST.ContainerDirective, 'attributes'> = {}
): MDAST.ContainerDirective {
  return {
    type: 'containerDirective'
  , name
  , children
  , attributes
  }
}
