import { transform } from '@src/transform-mdast-to-rmdast'
import * as M from '@src/mdast-utils/builder'
import * as R from '@src/rmdast-utils/builder'

describe('MDAST.Root', () => {
  it('return RMDAST.Root', () => {
    const mdast = M.root([])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([]))
  })
})

describe('MDAST.Paragraph', () => {
  it('return RMDAST.Paragraph', () => {
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
  it('return RMDAST.Heading', () => {
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
  it('return RMDAST.ThematicBreak', () => {
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
  it('return RMDAST.Blockquote', () => {
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
  it('return RMDAST.List', () => {
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
  it('return RMDAST.ListItem', () => {
    const mdast = M.root([
      M.list([
        M.listItem([], { checked: true, spread: true })
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.list([
        R.listItem([], { checked: true, spread: true })
      ], {})
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
  it('return RMDAST.Code', () => {
    const mdast = M.root([
      M.code('value', { lang: 'lang', meta: 'meta' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.code('value', { lang: 'lang', meta: 'meta' })
    ]))
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
  it('return RMDAST.Text', () => {
    const mdast = M.root([
      M.paragraph([
        M.text('value')
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.text('value')
      ])
    ]))
  })
})

describe('MDAST.Emphasis', () => {
  it('return RMDAST.Emphasis', () => {
    const mdast = M.root([
      M.paragraph([
        M.emphasis([])
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.emphasis([])
      ])
    ]))
  })
})

describe('MDAST.Strong', () => {
  it('return RMDAST.Strong', () => {
    const mdast = M.root([
      M.paragraph([
        M.strong([])
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.strong([])
      ])
    ]))
  })
})

describe('MDAST.InlineCode', () => {
  it('return RMDAST.InlineCode', () => {
    const mdast = M.root([
      M.paragraph([
        M.inlineCode('value')
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.inlineCode('value')
      ])
    ]))
  })
})

describe('MDAST.Break', () => {
  it('return RMDAST.Break', () => {
    const mdast = M.root([
      M.paragraph([
        M.brk()
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.brk()
      ])
    ]))
  })
})

describe('MDAST.Link', () => {
  it('return RMDAST.Link', () => {
    const mdast = M.root([
      M.paragraph([
        M.link('url', [], { title: 'title' })
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.link('url', [], { title: 'title' })
      ])
    ]))
  })
})

describe('MDAST.Image', () => {
  it('return RMDAST.InlineImage', () => {
    const mdast = M.root([
      M.paragraph([
        M.image('url', { title: 'title', alt: 'alt' })
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.inlineImage('url', { title: 'title', alt: 'alt' })
      ])
    ]))
  })
})

describe('MDAST.LinkReference', () => {
  it('return RMDAST.Link', () => {
    const mdast = M.root([
      M.paragraph([
        M.linkReference('identifier', 'shortcut', [])
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
  it('return RMDAST.InlineImage', () => {
    const mdast = M.root([
      M.paragraph([
        M.imageReference('identifier', 'shortcut', { alt: 'alt', label: 'label' })
      ])
    , M.definition('identifier', 'url', { title: 'title', label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.inlineImage('url', { title: 'title', alt: 'alt' })
      ])
    ]))
  })
})

describe('MDAST.Table, MDAST.TableRow, MDAST.TableCell', () => {
  it('return RMDAST.Table, RMDAST.TableRow, RMDAST.TableCell', () => {
    const mdast = M.root([
      M.table([
        M.tableRow([
          M.tableCell([M.text('header')])
        ])
      , M.tableRow([
          M.tableCell([M.text('body')])
        ])
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.table(
        R.tableRow([
          R.tableCell([R.text('header')])
        ])
      , [
          R.tableRow([
            R.tableCell([R.text('body')])
          ])
        ]
      )
    ]))
  })
})

describe('MDAST.Delete', () => {
  it('return RMDAST.Delete', () => {
    const mdast = M.root([
      M.paragraph([
        M.del([])
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.del([])
      ])
    ]))
  })
})

describe('MDAST.Footnote', () => {
  it('return RMDAST.Footnote', () => {
    const mdast = M.root([
      M.paragraph([
        M.footnote([])
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.inlineFootnote([])
      ])
    ]))
  })
})

describe('MDAST.FootnoteDefinition', () => {
  it('return undefined', () => {
    const mdast = M.root([
      M.footnoteDefinition('identifier', [])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([]))
  })
})

describe('MDAST.FootnoteReference', () => {
  it('return RMDAST.Footnote', () => {
    const mdast = M.root([
      M.paragraph([
        M.footnoteReference('identifier', { label: 'label' })
      ])
    , M.footnoteDefinition('identifier', [], { label: 'label' })
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.footnote([])
      ])
    ]))
  })
})

describe('MDAST.TextDirective', () => {
  it('return RMDAST.TextDirective', () => {
    const mdast = M.root([
      M.paragraph([
        M.textDirective('name', [], { attributes: { key: 'value' }})
      ])
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.textDirective('name', [], { attributes: { key: 'value' }})
      ])
    ]))
  })
})

describe('MDAST.LeafDirective', () => {
  it('return RMDAST.LeafDirective', () => {
    const mdast = M.root([
      M.leafDirective('name', [], { attributes: { key: 'value' }})
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.leafDirective('name', [], { attributes: { key: 'value' }})
    ]))
  })
})

describe('MDAST.ContainerDirective', () => {
  it('return RMDAST.ContainerDirective', () => {
    const mdast = M.root([
      M.containerDirective('name', [], { attributes: { key: 'value' }})
    ])

    const result = transform(mdast)

    expect(result).toStrictEqual(R.root([
      R.containerDirective('name', [], { attributes: { key: 'value' }})
    ]))
  })
})
