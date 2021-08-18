import { parse } from '@src/parse.js'
import { dedent } from 'extra-tags'
import * as R from '@src/rmdast-utils/builder.js'

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
