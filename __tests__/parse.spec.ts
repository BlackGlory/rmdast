import { parse } from '@src/parse.js'
import { dedent } from 'extra-tags'
import * as R from '@rmdast-utils/builder.js'

test('Paragraph', () => {
  const markdown = dedent`
  Lorem ipsum dolor sit amet,
  consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.paragraph([
      R.text('Lorem ipsum dolor sit amet,')
    , R.newline()
    , R.text('consectetur adipiscing elit,')
    , R.newline()
    , R.text('sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    ])
  , R.paragraph([
      R.text('Duis aute irure dolor in reprehenderit in voluptate')
    , R.newline()
    , R.text('velit esse cillum dolore eu fugiat nulla pariatur.')
    ])
  ]))
})

test('Gallery', () => {
  const markdown = dedent`
  # Gallery

  - ![](a)
  - ![](b)
  - ![](c)
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.heading(1, [R.text('Gallery')])
  , R.gallery([
      R.image('a', { alt: '' })
    , R.image('b', { alt: '' })
    , R.image('c', { alt: '' })
    ])
  ]))
})

test('Top-level InlineImage', () => {
  const markdown = dedent`
  # Top-level InlineImage

  ![](a)

  ![](b)

  ![](c)
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.heading(1, [R.text('Top-level InlineImage')])
  , R.image('a', { alt: '' })
  , R.image('b', { alt: '' })
  , R.image('c', { alt: '' })
  ]))
})

test('Footnote', () => {
  const markdown = dedent`
  Hello [^1]

  [^1]: World
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.paragraph([
      R.text('Hello ')
    , R.footnote([
        R.paragraph([
          R.text('World')
        ])
      ])
    ])
  ]))
})

test('InlineFootnote', () => {
  const markdown = dedent`
  Hello ^[World]
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.paragraph([
      R.text('Hello ')
    , R.inlineFootnote([
        R.text('World')
      ])
    ])
  ]))
})

test('TextDirective', () => {
  const markdown = dedent`
  :directive[*content*]{key=val}

  :directive[*content*]{key1=val1 key2=val2}

  :directive[*content*]{key='quotation marks'}

  :directive[*content*]{key="quotation marks"}

  :directive[*content*]{.className}

  :directive[*content*]{#idName}
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { key: 'val' } }
      )
    ])
  , R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { key1: 'val1', key2: 'val2' } }
      )
    ])
  , R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { key: 'quotation marks' } }
      )
    ])
  , R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { key: 'quotation marks' } }
      )
    ])
  , R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { class: 'className' } }
      )
    ])
  , R.paragraph([
      R.textDirective(
        'directive'
      , [R.emphasis([R.text('content')])]
      , { attributes: { id: 'idName' } }
      )
    ])
  ]))
})

test('LeftDirective', () => {
  const markdown = dedent`
  ::directive[*content*]{key=val}

  ::directive[*content*]{key1=val1 key2=val2}

  ::directive[*content*]{key='quotation marks'}

  ::directive[*content*]{key="quotation marks"}

  ::directive[*content*]{.className}

  ::directive[*content*]{#idName}
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { key: 'val' } }
    )
  , R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { key1: 'val1', key2: 'val2' } }
    )
  , R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { key: 'quotation marks' } }
    )
  , R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { key: 'quotation marks' } }
    )
  , R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { class: 'className' } }
    )
  , R.leafDirective(
      'directive'
    , [R.emphasis([R.text('content')])]
    , { attributes: { id: 'idName' } }
    )
  ]))
})

test('ContainerDirective', () => {
  const markdown = dedent`
  :::directive{key=val}
  *content*
  :::

  :::directive[*inline-content*]{key=val}
  *content*
  :::

  :::directive[*inline-content*]{key1=val1 key2=val2}
  *content*
  :::

  :::directive[*inline-content*]{key='quotation marks'}
  *content*
  :::

  :::directive[*inline-content*]{key="quotation marks"}
  *content*
  :::

  :::directive[*inline-content*]{.className}
  *content*
  :::

  :::directive[*inline-content*]{#idName}
  *content*
  :::
  `

  const result = parse(markdown)

  expect(result).toStrictEqual(R.root([
    R.containerDirective(
      'directive'
    , [R.paragraph([
        R.emphasis([R.text('content')])
      ])]
    , { attributes: { key: 'val' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { key: 'val' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { key1: 'val1', key2: 'val2' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { key: 'quotation marks' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { key: 'quotation marks' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { class: 'className' } }
    )
  , R.containerDirective(
      'directive'
    , [
        R.paragraph([
          R.emphasis([R.text('inline-content')])
        ])
      , R.paragraph([
          R.emphasis([R.text('content')])
        ])
      ]
    , { attributes: { id: 'idName' } }
    )
  ]))
})

describe('edge: CRLF', () => {
  test('paragraph', () => {
    const markdown = dedent`
    Lorem ipsum dolor sit amet,\r
    consectetur adipiscing elit,\r
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `

    const result = parse(markdown)

    expect(result).toStrictEqual(R.root([
      R.paragraph([
        R.text('Lorem ipsum dolor sit amet,')
      , R.newline()
      , R.text('consectetur adipiscing elit,')
      , R.newline()
      , R.text('sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      ])
    ]))
  })
})
