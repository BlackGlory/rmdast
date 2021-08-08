import { findAll } from '@src/rmdast-utils/find-all'
import { isText } from '@src/rmdast-utils/is'
import { paragraph, emphasis, text } from '@src/rmdast-utils/builder'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('findAll', () => {
  it('is preorder', () => {
    const ast =
      paragraph([
        emphasis([
          text('text')
        ])
      ])

    const result: string[] = []
    toArray(findAll(ast, node => {
      result.push(node.type)
      return false
    }))

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
    toArray(findAll(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    }))

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('yield found target', () => {
      const ast =
        paragraph([
          emphasis([
            text('inside emphasis')
          ])
        , text('inside paragraph')
        ])

      const result = findAll(ast, isText)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toStrictEqual([
        text('inside emphasis')
      , text('inside paragraph')
      ])
    })
  })
})
