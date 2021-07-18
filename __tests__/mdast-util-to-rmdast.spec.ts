import { transform } from '@src/mdast-util-to-rmdast'
import * as M from '@test/mdast-builder'
import * as R from '@src/builder'

describe('MDAST.Root', () => {
  it('return AST.Root', () => {
    const mdast = M.root([])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([]))
  })
})

describe('MDAST.Paragraph', () => {
  it('return AST.Paragraph', () => {
    const mdast = M.root([
      M.paragraph([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([])
    ]))
  })
})

describe('MDAST.Heading', () => {
  it('return AST.Heading', () => {
    const mdast = M.root([
      M.heading(1, [])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.heading(1, [])
    ]))
  })
})

describe('MDAST.ThematicBreak', () => {
  it('return AST.ThematicBreak', () => {
    const mdast = M.root([
      M.thematicBreak()
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.thematicBreak()
    ]))
  })
})

describe('MDAST.Blockquote', () => {
  it('return AST.Blockquote', () => {
    const mdast = M.root([
      M.blockquote([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.blockquote([])
    ]))
  })
})

describe('MDAST.List', () => {
  it('return AST.List', () => {
    const mdast = M.root([
      M.list([], { ordered: true, start: 1, spread: true })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.list([], { ordered: true, start: 1, spread: true })
    ]))
  })
})

describe('MDAST.ListItem', () => {
  it('return AST.ListItem', () => {
    const mdast = M.root([
      M.listItem([], { checked: true, spread: true })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.listItem([], { checked: true, spread: true })
    ]))
  })
})

describe('MDAST.Table', () => {
  it('return AST.Table', () => {
    const mdast = M.root([
      M.table([], { align: ['left'] })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.table([], { align: ['left'] })
    ]))
  })
})

describe('MDAST.TableRow', () => {
  it('return AST.TableRow', () => {
    const mdast = M.root([
      M.tableRow([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.tableRow([])
    ]))
  })
})

describe('TableCell', () => {
  it('return AST.TableCell', () => {
    const mdast = M.root([
      M.tableCell([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.tableCell([])
    ]))
  })
})

describe('MDAST.HTML', () => {
  describe('HTML comments', () => {
    it('return undefined', () => {
      const mdast = M.root([
        M.html(
          '<!--' + '\n'
        + '  example' + '\n'
        + '-->'
        )
      ])

      const result = transform(mdast)

      expect(result).toStrictEqual(R.root([]))
    })
  })

  describe('HTML tags', () => {
    it('return undefined', () => {
      const mdast = M.root([
        M.html('<a href="url"><em>content</em></a>')
      ])

      const result = transform(mdast)

      expect(result).toStrictEqual(R.root([]))
    })
  })
})

describe('MDAST.Code', () => {
  it('return AST.Code', () => {
    const mdast = M.root([
      M.code('value', { lang: 'lang', meta: 'meta' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.code('value', { lang: 'lang', meta: 'meta' })
    ]))
  })
})

describe('MDAST.YAML', () => {
  it('return undefined', () => {
    const mdast = M.root([
      M.yaml('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([]))
  })
})

describe('MDAST.Definition', () => {
  it('return undefined', () => {
    const mdast = M.root([
      M.definition('identifier', 'url', { label: 'label', title: 'title' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([]))
  })
})

describe('MDAST.Text', () => {
  it('return AST.Text', () => {
    const mdast = M.root([
      M.text('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.text('value')
    ]))
  })
})

describe('MDAST.Emphasis', () => {
  it('return AST.Emphasis', () => {
    const mdast = M.root([
      M.emphasis([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.emphasis([])
    ]))
  })
})

describe('MDAST.Strong', () => {
  it('return AST.Strong', () => {
    const mdast = M.root([
      M.strong([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.strong([])
    ]))
  })
})

describe('MDAST.Delete', () => {
  it('return AST.Delete', () => {
    const mdast = M.root([
      M.del([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.del([])
    ]))
  })
})

describe('MDAST.InlineCode', () => {
  it('return AST.InlineCode', () => {
    const mdast = M.root([
      M.inlineCode('value')
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.inlineCode('value')
    ]))
  })
})

describe('MDAST.Break', () => {
  it('return AST.Break', () => {
    const mdast = M.root([
      M.brk()
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.brk()
    ]))
  })
})

describe('MDAST.Link', () => {
  it('return AST.Link', () => {
    const mdast = M.root([
      M.link('url', [], { title: 'title' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.link('url', [], { title: 'title' })
    ]))
  })
})

describe('MDAST.Image', () => {
  it('return AST.Image', () => {
    const mdast = M.root([
      M.image('url', { title: 'title', alt: 'alt' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.image('url', { title: 'title', alt: 'alt' })
    ]))
  })
})

describe('MDAST.LinkReference', () => {
  it('return AST.Link', () => {
    const mdast = M.root([
      M.paragraph([
        M.linkRef('identifier', 'shortcut', [])
      ])
    , M.definition('identifier', 'url', { title: 'title', label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.link('url', [], { title: 'title' })
      ])
    ]))
  })
})

describe('MDAST.ImageReference', () => {
  it('return AST.Image', () => {
    const mdast = M.root([
      M.paragraph([
        M.imageRef('identifier', 'shortcut', { alt: 'alt', label: 'label' })
      ])
    , M.definition('identifier', 'url', { title: 'title', label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.image('url', { title: 'title', alt: 'alt' })
      ])
    ]))
  })
})

describe('MDAST.Footnote', () => {
  it('return AST.Footnote', () => {
    const mdast = M.root([
      M.footnote([])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.footnote([])
    ]))
  })
})

describe('MDAST.FootnoteReference', () => {
  it('return AST.Footnote', () => {
    const mdast = M.root([
      M.footnoteRef('identifier', { label: 'label' })
    , M.footnoteDef('identifier', [], { label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.footnote([])
    ]))
  })
})
