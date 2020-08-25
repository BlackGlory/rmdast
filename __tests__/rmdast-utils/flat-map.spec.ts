import { flatMap } from '@src/rmdast-utils/flat-map'
import { isText, isEmphasis, isComponent } from '@src/is'
import { paragraph, emphasis, strong, text, component } from '@src/builder'
import { produce } from 'immer'

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

  it('bypass Component.children', () => {
    const ast =
      paragraph([
        emphasis([
          text('inside emphasis')
        ])
      , component('message', {}, 'inside component', [
          text('inside component')
        ])
      ])

    const result: string[] = []
    flatMap(ast, node => {
      if (isText(node)) result.push(node.value)
      return [node]
    })

    expect(result).toStrictEqual(['inside emphasis'])
  })

  it('create a new tree', () => {
    const ast =
      paragraph([
        emphasis([
          text('inside emphasis')
        ])
      , component('message', {}, 'inside component', [
          text('inside component')
        ])
      ])

    const result = flatMap(ast, node => {
      if (isEmphasis(node)) return [strong(node.children)]
      if (isComponent(node)) return [produce(node, node => {
        node.attributes['title'] = 'Message'
      })]
      if (isText(node)) return [text('inside strong')]
      return [node]
    })

    expect(result[0]).not.toBe(ast)
    expect(result).toStrictEqual([
      paragraph([
        strong([
          text('inside strong')
        ])
      , component(
          'message'
        , { title: 'Message' }
        , 'inside component'
        , [
          text('inside component')
          ]
        )
      ])
    ])
  })
})
