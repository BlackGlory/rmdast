import { find } from '@rmdast-utils/find.js'
import { isText, isStrong } from '@rmdast-utils/is.js'
import { paragraph, emphasis, text } from '@rmdast-utils/builder.js'

describe('find', () => {
  it('is preorder', () => {
    const ast =
      paragraph([
        emphasis([
          text('text')
        ])
      ])

    const result: string[] = []
    find(ast, node => {
      result.push(node.type)
      return false
    })

    expect(result).toEqual(['paragraph', 'emphasis', 'text'])
  })

  it('is DFS', () => {
    const ast =
      paragraph([
        emphasis([
          text('deep')
        ])
      , text('shallow')
      ])

    const result: string[] = []
    find(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('return found target', () => {
      const ast =
        paragraph([
          emphasis([
            text('inside emphasis')
          ])
        ])

      const result = find(ast, isText)

      expect(result).toStrictEqual(
        text('inside emphasis')
      )
    })
  })

  describe('not found', () => {
    it('return undefined', () => {
      const ast =
        paragraph([
          emphasis([
            text('inside emphasis')
          ])
        ])

      const result = find(ast, isStrong)

      expect(result).toBeUndefined()
    })
  })
})
