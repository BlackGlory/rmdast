import * as MDAST from 'mdast'
import * as AST from '@src/ast'
import { transform } from '@src/transformer'
import {
  blockquote
, brk
, code
, definition
, del
, emphasis
, footnote
, footnoteDef
, footnoteRef
, heading
, html
, image
, imageRef
, inlineCode
, link
, linkRef
, list
, listItem
, paragraph
, root
, strong
, table
, tableCell
, tableRow
, text
, thematicBreak
, yaml
} from '@test/builder'

describe('MDAST.Root', () => {
  it('return AST.Root', () => {
    const mdast = root([])
    const ast: AST.Root = {
      type: 'root'
    , children: []
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Paragraph', () => {
  it('return AST.Paragraph', () => {
    const mdast = root([
      paragraph([])
    ]) as MDAST.Root
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'paragraph'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Heading', () => {
  it('return AST.Heading', () => {
    const mdast = root([
      heading(1, [])
    ]) as MDAST.Root
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'heading'
        , children: []
        , depth: 1
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.ThematicBreak', () => {
  it('return AST.ThematicBreak', () => {
    const mdast = root([
      thematicBreak()
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        { type: 'thematicBreak' }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Blockquote', () => {
  it('return AST.Blockquote', () => {
    const mdast = root([
      blockquote([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'blockquote'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.List', () => {
  it('return AST.List', () => {
    const mdast = root([
      list([], { ordered: true, start: 1, spread: true })
    ])

    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'list'
        , children: []
        , ordered: true
        , start: 1
        , spread: true
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.ListItem', () => {
  it('return AST.ListItem', () => {
    const mdast = root([
      listItem([], { checked: true, spread: true })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'listItem'
        , checked: true
        , spread: true
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Table', () => {
  it('return AST.Table', () => {
    const mdast = root([
      table([], { align: ['left'] })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'table'
        , align: ['left']
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.TableRow', () => {
  it('return AST.TableRow', () => {
    const mdast = root([
      tableRow([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'tableRow'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('TableCell', () => {
  it('return AST.TableCell', () => {
    const mdast = root([
      tableCell([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'tableCell'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.HTML', () => {
  describe('comments', () => {
    it('return undefined', () => {
      const mdast = root([
        html(
          '<!--' + '\n'
        + '  example' + '\n'
        + '-->'
        )
      ])
      const ast: AST.Root = {
        type: 'root'
      , children: []
      }

      const result = transform(mdast)

      expect(result).toStrictEqual(ast)
    })
  })

  describe('components', () => {
    it('return AST.Component', () => {
      const mdast = root([
        html('<a href="url"><em>content</em></a>')
      ])
      const ast: AST.Root = {
        type: 'root'
      , children: [
          {
            type: 'component'
          , name: 'a'
          , attrs: { href: 'url' }
          , children: [
              {
                type: 'component'
              , name: 'em'
              , attrs: {}
              , children: [
                  { type: 'text', value: 'content' }
                ]
              , value: 'content'
              }
            ]
          , value: '<em>content</em>'
          }
        ]
      }

      const result = transform(mdast)

      expect(result).toStrictEqual(ast)
    })
  })
})

describe('MDAST.Code', () => {
  it('return AST.Code', () => {
    const mdast = root([
      code('value', { lang: 'lang', meta: 'meta' })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'code'
        , value: 'value'
        , lang: 'lang'
        , meta: 'meta'
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.YAML', () => {
  it('return AST.YAML', () => {
    const mdast = root([
      yaml('value')
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: []
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Definition', () => {
  it('return undefined', () => {
    const mdast = root([
      definition('identifier', 'url', { label: 'label', title: 'title' })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: []
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Text', () => {
  it('return AST.Text', () => {
    const mdast = root([
      text('value')
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'text'
        , value: 'value'
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Emphasis', () => {
  it('return AST.Emphasis', () => {
    const mdast = root([
      emphasis([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'emphasis'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Strong', () => {
  it('return AST.Strong', () => {
    const mdast = root([
      strong([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'strong'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Delete', () => {
  it('return AST.Delete', () => {
    const mdast = root([
      del([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'delete'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.InlineCode', () => {
  it('return AST.InlineCode', () => {
    const mdast = root([
      inlineCode('value')
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'inlineCode'
        , value: 'value'
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Break', () => {
  it('return AST.Break', () => {
    const mdast = root([
      brk()
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [{ type: 'break' }]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Link', () => {
  it('return AST.Link', () => {
    const mdast = root([
      link('url', [], { title: 'title' })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'link'
        , children: []
        , url: 'url'
        , title: 'title'
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Image', () => {
  it('return AST.Image', () => {
    const mdast = root([
      image('url', { title: 'title', alt: 'alt' })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'image'
        , url: 'url'
        , alt: 'alt'
        , title: 'title'
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.LinkReference', () => {
  it('return AST.Link', () => {
    const mdast = root([
      paragraph([
        linkRef('identifier', 'shortcut', [])
      ])
    , definition('identifier', 'url', { title: 'title', label: 'label' })
    ])
    const astLink: AST.Link = {
      type: 'link'
    , children: []
    , url: 'url'
    , title: 'title'
    }
    const astParagraph: AST.Paragraph = {
      type: 'paragraph'
    , children: [astLink]
    }
    const ast: AST.Root = {
      type: 'root'
    , children: [astParagraph]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.ImageReference', () => {
  it('return AST.Image', () => {
    const mdast = root([
      paragraph([
        imageRef('identifier', 'shortcut', { alt: 'alt', label: 'label' })
      ])
    , definition('identifier', 'url', { title: 'title', label: 'label' })
    ])
    const astLink: AST.Image = {
      type: 'image'
    , url: 'url'
    , title: 'title'
    , alt: 'alt'
    }
    const astParagraph: AST.Paragraph = {
      type: 'paragraph'
    , children: [astLink]
    }
    const ast: AST.Root = {
      type: 'root'
    , children: [astParagraph]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.Footnote', () => {
  it('return AST.Footnote', () => {
    const mdast = root([
      footnote([])
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'footnote'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})

describe('MDAST.FootnoteReference', () => {
  it('return AST.Footnote', () => {
    const mdast = root([
      footnoteRef('identifier', { label: 'label' })
    , footnoteDef('identifier', [], { label: 'label' })
    ])
    const ast: AST.Root = {
      type: 'root'
    , children: [
        {
          type: 'footnote'
        , children: []
        }
      ]
    }

    const result = transform(mdast)

    expect(result).toStrictEqual(ast)
  })
})
