import * as RMDAST from '@src/rmdast-1.0'

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
, { ordered = null, start = null, spread = null }: Partial<Pick<RMDAST.List, 'ordered' | 'start' | 'spread'>>
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
, { checked = null, spread = null }: Partial<Pick<RMDAST.ListItem, 'checked' | 'spread'>>
): RMDAST.ListItem {
  return {
    type: 'listItem'
  , children
  , checked
  , spread
  }
}

export function table(
  children: RMDAST.Table['children']
, { align = null }: Partial<Pick<RMDAST.Table, 'align'>>
): RMDAST.Table {
  return {
    type: 'table'
  , children
  , align
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

export function component(
  name: RMDAST.Component['name']
, attributes: RMDAST.Component['attributes']
, value: RMDAST.Component['value']
, children: RMDAST.Component['children']
): RMDAST.Component {
  return {
    type: 'component'
  , name
  , attributes
  , value
  , children
  }
}

export function code(
  value: string
, { lang = null, meta = null }: Partial<Pick<RMDAST.Code, 'lang' | 'meta'>>
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

export function del(children: RMDAST.Delete['children']): RMDAST.Delete {
  return {
    type: 'delete'
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
, { title = null }: Partial<Pick<RMDAST.Link, 'title'>>
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
, { title = null, alt = null }: Partial<Pick<RMDAST.Image, 'title' | 'alt'>>
): RMDAST.Image {
  return {
    type: 'image'
  , url
  , title
  , alt
  }
}

export function footnote(children: RMDAST.Footnote['children']): RMDAST.Footnote {
  return {
    type: 'footnote'
  , children
  }
}
