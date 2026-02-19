import { traverseDescendantNodes } from '@rmdast-utils/traverse-descendant-nodes.js'
import { isText } from '@rmdast-utils/is.js'
import { paragraph, emphasis, text } from '@rmdast-utils/builder.js'

describe('traverseDescendantNodes', () => {
  test('preorder', () => {
    const ast = paragraph([
      emphasis([
        text('text')
      ])
    ])

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      result.push(node.type)
    }

    expect(result).toEqual(['emphasis', 'text'])
  })

  test('DFS', () => {
    const ast = paragraph([
      emphasis([
        text('deep')
      ])
    , text('shallow')
    ])

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      if (isText(node)) result.push(node.value)
    }

    expect(result).toEqual(['deep', 'shallow'])
  })
})
