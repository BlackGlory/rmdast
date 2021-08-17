import * as RMDAST from '@src/rmdast.js'

export function root(children: RMDAST.Root['children']): RMDAST.Root {
  return {
    type: 'root'
  , children
  }
}

export function paragraph(children: RMDAST.Paragraph['children']): RMDAST.Paragraph {
  return {
    type: 'paragraph'
  , children
  }
}

export function heading(depth: RMDAST.Heading['depth'], children: RMDAST.Heading['children']): RMDAST.Heading {
  return {
    type: 'heading'
  , depth
  , children
  }
}

export function thematicBreak(): RMDAST.ThematicBreak {
  return {
    type: 'thematicBreak'
  }
}

export function blockquote(children: RMDAST.Blockquote['children']): RMDAST.Blockquote {
  return {
    type: 'blockquote'
  , children
  }
}

export function list(
  children: RMDAST.List['children']
, { ordered = null, start = null, spread = null }: Partial<Pick<RMDAST.List, 'ordered' | 'start' | 'spread'>> = {}
): RMDAST.List {
  return {
    type: 'list'
  , children
  , ordered
  , start
  , spread
  }
}

export function listItem(
  children: RMDAST.ListItem['children']
, { checked = null, spread = null }: Partial<Pick<RMDAST.ListItem, 'checked' | 'spread'>> = {}
): RMDAST.ListItem {
  return {
    type: 'listItem'
  , spread
  , checked
  , children
  }
}

export function code(
  value: string
, { lang = null, meta = null }: Partial<Pick<RMDAST.Code, 'lang' | 'meta'>> = {}
): RMDAST.Code {
  return {
    type: 'code'
  , value
  , lang
  , meta
  }
}

export function text(value: string): RMDAST.Text {
  return {
    type: 'text'
  , value
  }
}

export function emphasis(children: RMDAST.Emphasis['children']): RMDAST.Emphasis {
  return {
    type: 'emphasis'
  , children
  }
}

export function strong(children: RMDAST.Strong['children']): RMDAST.Strong {
  return {
    type: 'strong'
  , children
  }
}

export function inlineCode(value: RMDAST.InlineCode['value']): RMDAST.InlineCode {
  return {
    type: 'inlineCode'
  , value
  }
}

export function brk(): RMDAST.Break {
  return {
    type: 'break'
  }
}

export function link(
  url: RMDAST.Link['url']
, children: RMDAST.Link['children']
, { title = null }: Partial<Pick<RMDAST.Link, 'title'>> = {}
): RMDAST.Link {
  return {
    type: 'link'
  , url
  , title
  , children
  }
}

export function image(
  url: RMDAST.Image['url']
, { title = null, alt = null }: Partial<Pick<RMDAST.Image, 'title' | 'alt'>> = {}
): RMDAST.Image {
  return {
    type: 'image'
  , url
  , title
  , alt
  }
}

export function inlineImage(
  url: RMDAST.InlineImage['url']
, { title = null, alt = null }: Partial<Pick<RMDAST.InlineImage, 'title' | 'alt'>> = {}
): RMDAST.InlineImage {
  return {
    type: 'inlineImage'
  , url
  , title
  , alt
  }
}

export function table(
  header: RMDAST.Table['header']
, children: RMDAST.Table['children']
): RMDAST.Table {
  return {
    type: 'table'
  , header
  , children
  }
}

export function tableRow(children: RMDAST.TableRow['children']): RMDAST.TableRow {
  return {
    type: 'tableRow'
  , children
  }
}

export function tableCell(children: RMDAST.TableCell['children']): RMDAST.TableCell {
  return {
    type: 'tableCell'
  , children
  }
}

export function del(children: RMDAST.Delete['children']): RMDAST.Delete {
  return {
    type: 'delete'
  , children
  }
}

export function footnote(children: RMDAST.Footnote['children']): RMDAST.Footnote {
  return {
    type: 'footnote'
  , children
  }
}

export function inlineFootnote(
  children: RMDAST.InlineFootnote['children']
): RMDAST.InlineFootnote {
  return {
    type: 'inlineFootnote'
  , children
  }
}

export function textDirective(
  name: RMDAST.TextDirective['name']
, children: RMDAST.TextDirective['children']
, { attributes = {} }: Partial<Pick<RMDAST.TextDirective, 'attributes'>> = {}
): RMDAST.TextDirective {
  return {
    type: 'textDirective'
  , name
  , attributes
  , children
  }
}

export function leafDirective(
  name: RMDAST.LeafDirective['name']
, children: RMDAST.LeafDirective['children']
, { attributes = {} }: Partial<Pick<RMDAST.LeafDirective, 'attributes'>> = {}
): RMDAST.LeafDirective {
  return {
    type: 'leafDirective'
  , name
  , attributes
  , children
  }
}

export function containerDirective(
  name: RMDAST.ContainerDirective['name']
, children: RMDAST.ContainerDirective['children']
, { attributes = {} }: Partial<Pick<RMDAST.ContainerDirective, 'attributes'>> = {}
): RMDAST.ContainerDirective {
  return {
    type: 'containerDirective'
  , name
  , attributes
  , children
  }
}

export function gallery(children: RMDAST.Gallery['children']): RMDAST.Gallery {
  return {
    type: 'gallery'
  , children
  }
}
