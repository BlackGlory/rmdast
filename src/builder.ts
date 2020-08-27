import * as AST from '@src/ast'

export function root(children: AST.Root['children']): AST.Root {
  return {
    type: 'root'
  , children
  }
}

export function paragraph(children: AST.Paragraph['children']): AST.Paragraph {
  return {
    type: 'paragraph'
  , children
  }
}

export function heading(depth: AST.Heading['depth'], children: AST.Heading['children']): AST.Heading {
  return {
    type: 'heading'
  , depth
  , children
  }
}

export function thematicBreak(): AST.ThematicBreak {
  return {
    type: 'thematicBreak'
  }
}

export function blockquote(children: AST.Blockquote['children']): AST.Blockquote {
  return {
    type: 'blockquote'
  , children
  }
}

export function list(
  children: AST.List['children']
, { ordered = null, start = null, spread = null }: Partial<Pick<AST.List, 'ordered' | 'start' | 'spread'>>
): AST.List {
  return {
    type: 'list'
  , children
  , ordered
  , start
  , spread
  }
}

export function listItem(
  children: AST.ListItem['children']
, { checked = null, spread = null }: Partial<Pick<AST.ListItem, 'checked' | 'spread'>>
): AST.ListItem {
  return {
    type: 'listItem'
  , children
  , checked
  , spread
  }
}

export function table(
  children: AST.Table['children']
, { align = null }: Partial<Pick<AST.Table, 'align'>>
): AST.Table {
  return {
    type: 'table'
  , children
  , align
  }
}

export function tableRow(children: AST.TableRow['children']): AST.TableRow {
  return {
    type: 'tableRow'
  , children
  }
}

export function tableCell(children: AST.TableCell['children']): AST.TableCell {
  return {
    type: 'tableCell'
  , children
  }
}

export function component(
  name: AST.Component['name']
, attributes: AST.Component['attributes']
, value: AST.Component['value']
, children: AST.Component['children']
): AST.Component {
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
, { lang = null, meta = null }: Partial<Pick<AST.Code, 'lang' | 'meta'>>
): AST.Code {
  return {
    type: 'code'
  , value
  , lang
  , meta
  }
}

export function text(value: string): AST.Text {
  return {
    type: 'text'
  , value
  }
}

export function emphasis(children: AST.Emphasis['children']): AST.Emphasis {
  return {
    type: 'emphasis'
  , children
  }
}

export function strong(children: AST.Strong['children']): AST.Strong {
  return {
    type: 'strong'
  , children
  }
}

export function del(children: AST.Delete['children']): AST.Delete {
  return {
    type: 'delete'
  , children
  }
}

export function inlineCode(value: AST.InlineCode['value']): AST.InlineCode {
  return {
    type: 'inlineCode'
  , value
  }
}

export function brk(): AST.Break {
  return {
    type: 'break'
  }
}

export function link(
  url: AST.Link['url']
, children: AST.Link['children']
, { title = null }: Partial<Pick<AST.Link, 'title'>>
): AST.Link {
  return {
    type: 'link'
  , url
  , title
  , children
  }
}

export function image(
  url: AST.Image['url']
, { title = null, alt = null }: Partial<Pick<AST.Image, 'title' | 'alt'>>
): AST.Image {
  return {
    type: 'image'
  , url
  , title
  , alt
  }
}

export function footnote(children: AST.Footnote['children']): AST.Footnote {
  return {
    type: 'footnote'
  , children
  }
}
