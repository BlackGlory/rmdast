import { transform } from '@src/mdast-util-to-rmdast'
import * as mb from '@test/mdast-builder'
import * as rb from '@src/builder'

describe('MDAST.Root', () => {
  it('return AST.Root', () => {
    const mdast = mb.root([])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([]))
  })
})

describe('MDAST.Paragraph', () => {
  it('return AST.Paragraph', () => {
    const mdast = mb.root([
      mb.paragraph([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.paragraph([])
    ]))
  })
})

describe('MDAST.Heading', () => {
  it('return AST.Heading', () => {
    const mdast = mb.root([
      mb.heading(1, [])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.heading(1, [])
    ]))
  })
})

describe('MDAST.ThematicBreak', () => {
  it('return AST.ThematicBreak', () => {
    const mdast = mb.root([
      mb.thematicBreak()
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.thematicBreak()
    ]))
  })
})

describe('MDAST.Blockquote', () => {
  it('return AST.Blockquote', () => {
    const mdast = mb.root([
      mb.blockquote([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.blockquote([])
    ]))
  })
})

describe('MDAST.List', () => {
  it('return AST.List', () => {
    const mdast = mb.root([
      mb.list([], { ordered: true, start: 1, spread: true })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.list([], { ordered: true, start: 1, spread: true })
    ]))
  })
})

describe('MDAST.ListItem', () => {
  it('return AST.ListItem', () => {
    const mdast = mb.root([
      mb.listItem([], { checked: true, spread: true })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.listItem([], { checked: true, spread: true })
    ]))
  })
})

describe('MDAST.Table', () => {
  it('return AST.Table', () => {
    const mdast = mb.root([
      mb.table([], { align: ['left'] })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.table([], { align: ['left'] })
    ]))
  })
})

describe('MDAST.TableRow', () => {
  it('return AST.TableRow', () => {
    const mdast = mb.root([
      mb.tableRow([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.tableRow([])
    ]))
  })
})

describe('TableCell', () => {
  it('return AST.TableCell', () => {
    const mdast = mb.root([
      mb.tableCell([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.tableCell([])
    ]))
  })
})

describe('MDAST.HTML', () => {
  describe('comments', () => {
    it('return undefined', () => {
      const mdast = mb.root([
        mb.html(
          '<!--' + '\n'
        + '  example' + '\n'
        + '-->'
        )
      ])

      const result = transform(mdast)

      expect(result).toStrictEqual(rb.root([]))
    })
  })

  describe('components', () => {
    it('return AST.Component', () => {
      const mdast = mb.root([
        mb.html('<a href="url"><em>content</em></a>')
      ])

      const result = transform(mdast)

      expect(result).toStrictEqual(rb.root([
        rb.component('a', { href: 'url' }, '<em>content</em>', [
          rb.component('em', {}, 'content', [
            rb.text('content')
          ])
        ])
      ]))
    })
  })
})

describe('MDAST.Code', () => {
  it('return AST.Code', () => {
    const mdast = mb.root([
      mb.code('value', { lang: 'lang', meta: 'meta' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.code('value', { lang: 'lang', meta: 'meta' })
    ]))
  })
})

describe('MDAST.YAML', () => {
  it('return undefined', () => {
    const mdast = mb.root([
      mb.yaml('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([]))
  })
})

describe('MDAST.Definition', () => {
  it('return undefined', () => {
    const mdast = mb.root([
      mb.definition('identifier', 'url', { label: 'label', title: 'title' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([]))
  })
})

describe('MDAST.Text', () => {
  it('return AST.Text', () => {
    const mdast = mb.root([
      mb.text('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.text('value')
    ]))
  })
})

describe('MDAST.Emphasis', () => {
  it('return AST.Emphasis', () => {
    const mdast = mb.root([
      mb.emphasis([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.emphasis([])
    ]))
  })
})

describe('MDAST.Strong', () => {
  it('return AST.Strong', () => {
    const mdast = mb.root([
      mb.strong([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.strong([])
    ]))
  })
})

describe('MDAST.Delete', () => {
  it('return AST.Delete', () => {
    const mdast = mb.root([
      mb.del([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.del([])
    ]))
  })
})

describe('MDAST.InlineCode', () => {
  it('return AST.InlineCode', () => {
    const mdast = mb.root([
      mb.inlineCode('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.inlineCode('value')
    ]))
  })
})

describe('MDAST.Break', () => {
  it('return AST.Break', () => {
    const mdast = mb.root([
      mb.brk()
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.brk()
    ]))
  })
})

describe('MDAST.Link', () => {
  it('return AST.Link', () => {
    const mdast = mb.root([
      mb.link('url', [], { title: 'title' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.link('url', [], { title: 'title' })
    ]))
  })
})

describe('MDAST.Image', () => {
  it('return AST.Image', () => {
    const mdast = mb.root([
      mb.image('url', { title: 'title', alt: 'alt' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.image('url', { title: 'title', alt: 'alt' })
    ]))
  })
})

describe('MDAST.LinkReference', () => {
  it('return AST.Link', () => {
    const mdast = mb.root([
      mb.paragraph([
        mb.linkRef('identifier', 'shortcut', [])
      ])
    , mb.definition('identifier', 'url', { title: 'title', label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.paragraph([
        rb.link('url', [], { title: 'title' })
      ])
    ]))
  })
})

describe('MDAST.ImageReference', () => {
  it('return AST.Image', () => {
    const mdast = mb.root([
      mb.paragraph([
        mb.imageRef('identifier', 'shortcut', { alt: 'alt', label: 'label' })
      ])
    , mb.definition('identifier', 'url', { title: 'title', label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.paragraph([
        rb.image('url', { title: 'title', alt: 'alt' })
      ])
    ]))
  })
})

describe('MDAST.Footnote', () => {
  it('return AST.Footnote', () => {
    const mdast = mb.root([
      mb.footnote([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.footnote([])
    ]))
  })
})

describe('MDAST.FootnoteReference', () => {
  it('return AST.Footnote', () => {
    const mdast = mb.root([
      mb.footnoteRef('identifier', { label: 'label' })
    , mb.footnoteDef('identifier', [], { label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(rb.root([
      rb.footnote([])
    ]))
  })
})
