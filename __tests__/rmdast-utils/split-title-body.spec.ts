import { splitTitleBody } from '@src/rmdast-utils/split-title-body'
import { root, heading, paragraph, text } from '@src/builder'

describe('splitTitleBody', () => {
  it('return title and body', () => {
    const ast =
      root([
        heading(1, [text('title')])
      , paragraph([text('body')])
      ])

    const result = splitTitleBody(ast)

    expect(result.title).toBe('title')
    expect(result.body).toStrictEqual(
      root([
        paragraph([text('body')])
      ])
    )
  })
})
