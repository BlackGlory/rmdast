import { wrapAST } from '@src/rmdast-utils/wrap.js'
import * as R from '@src/rmdast-utils/builder.js'

describe('wrapAST', () => {
  test('root', () => {
    const ast = R.root([
      R.paragraph([
        R.text('first')
      ])
    , R.paragraph([
        R.text('middle')
      ])
    , R.paragraph([
        R.text('last')
      ])
    ])

    const result = wrapAST(ast)

    expect(result).toMatchObject({
      type: 'root'
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , previousSibling: null
        , children: [
            {
              type: 'text'
            , value: 'first'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , children: [
            {
              type: 'text'
            , value: 'middle'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , nextSibling: null
        , children: [
            {
              type: 'text'
            , value: 'last'
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      ]
    })
    expect(result.children[0].nextSibling).toBe(result.children[1])
    expect(result.children[0].parent).toBe(result)
    expect((result.children[0] as any).children[0].parent).toBe(result.children[0])
    expect(result.children[1].parent).toBe(result)
    expect(result.children[1].previousSibling).toBe(result.children[0])
    expect(result.children[1].nextSibling).toBe(result.children[2])
    expect((result.children[1] as any).children[0].parent).toBe(result.children[1])
    expect(result.children[2].parent).toBe(result)
    expect(result.children[2].previousSibling).toBe(result.children[1])
    expect((result.children[2] as any).children[0].parent).toBe(result.children[2])
  })

  test('table.header', () => {
    const ast = R.root([
      R.table(
        R.tableRow([])
      , []
      )
    ])

    const result = wrapAST(ast)

    expect(result).toMatchObject({
      type: 'root'
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'table'
        , previousSibling: null
        , nextSibling: null
        , header: {
            type: 'tableRow'
          , children: []
          , previousSibling: null
          , nextSibling: null
          }
        , children: []
        }
      ]
    })
    expect(result.children[0].parent).toBe(result)
    expect((result.children[0] as any).header.parent).toBe(result.children[0])
  })
})
