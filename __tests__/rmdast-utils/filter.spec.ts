import { filter } from '@rmdast-utils/filter.js'
import { isText, isEmphasis } from '@rmdast-utils/is.js'
import { paragraph, emphasis, strong, text } from '@rmdast-utils/builder.js'

describe('filter', () => {
  test('preorder', () => {
    const ast = paragraph([
      emphasis([
        text('text')
      ])
    ])

    const result: string[] = []
    filter(ast, node => {
      result.push(node.type)
      return true
    })

    expect(result).toEqual(['paragraph', 'emphasis', 'text'])
  })

  test('DFS', () => {
    const ast = paragraph([
      emphasis([
        text('deep')
      ])
    , text('shallow')
    ])

    const result: string[] = []
    filter(ast, node => {
      if (isText(node)) result.push(node.value)
      return true
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  test('create a new tree', () => {
    const ast = paragraph([
      emphasis([
        text('foo')
      ])
    , strong([
        text('bar')
      ])
    ])

    const result = filter(ast, node => {
      if (isEmphasis(node)) return false
      if (isText(node) && node.value === 'bar') return false
      return true
    })

    expect(result).toStrictEqual(
      paragraph([
        strong([])
      ])
    )
  })
})
