import { find } from '@src/rmdast-utils/find'
import { isText, isComponent } from '@src/is'
import { paragraph, emphasis, text, component } from '@src/builder'

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

  it('bypass Component.children', () => {
    const ast =
      paragraph([
        component('message', {}, 'inside component', [
          text('inside component')
        ])
      , emphasis([
          text('inside emphasis')
        ])
      ])

    const result = find(ast, isText)

    expect(result).toStrictEqual(
      text('inside emphasis')
    )
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

      const result = find(ast, isComponent)

      expect(result).toBeUndefined()
    })
  })
})
