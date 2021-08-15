import { parse } from '@src/parse.js'
import { dedent } from 'extra-tags'
import * as R from '@src/rmdast-utils/builder.js'

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
