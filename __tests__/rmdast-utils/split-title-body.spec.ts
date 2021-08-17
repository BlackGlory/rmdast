import { splitTitleBody } from '@src/rmdast-utils/split-title-body.js'
import { root, heading, paragraph, text } from '@src/rmdast-utils/builder.js'

describe('splitTitleBody', () => {
  it('return title and body', () => {
    const ast =
      root([
        heading(1, [text('title')])
      , paragraph([text('body')])
      ])

    const result = splitTitleBody(ast)

    expect(result.title).toStrictEqual(heading(1, [text('title')]))
    expect(result.body).toStrictEqual(
      root([
        paragraph([text('body')])
      ])
    )
  })
})
