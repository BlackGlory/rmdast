import { flatMap } from '@rmdast-utils/flat-map.js'
import { isText, isEmphasis } from '@rmdast-utils/is.js'
import { paragraph, emphasis, strong, text } from '@rmdast-utils/builder.js'

describe('flatMap', () => {
  it('is preorder', () => {
    const ast =
      paragraph([
        emphasis([
          text('text')
        ])
      ])

    const result: string[] = []
    flatMap(ast, node => {
      result.push(node.type)
      return [node]
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
    flatMap(ast, node => {
      if (isText(node)) result.push(node.value)
      return [node]
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  it('create a new tree', () => {
    const ast =
      paragraph([
        emphasis([
          text('inside emphasis')
        ])
      ])

    const result = flatMap(ast, node => {
      if (isEmphasis(node)) return [strong(node.children)]
      if (isText(node)) return [text('inside strong')]
      return [node]
    })

    expect(result[0]).not.toBe(ast)
    expect(result).toStrictEqual([
      paragraph([
        strong([
          text('inside strong')
        ])
      ])
    ])
  })
})
