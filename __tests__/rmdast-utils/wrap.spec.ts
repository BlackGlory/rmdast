import { wrap } from '@src/rmdast-utils/wrap.js'
import * as R from '@src/rmdast-utils/builder.js'

describe('wrap', () => {
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

    const result = wrap(ast)

    expect(result).toMatchObject({
      type: 'root'
    , id: expect.any(String)
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , id: expect.any(String)
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
        , id: expect.any(String)
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
        , id: expect.any(String)
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

    const result = wrap(ast)

    expect(result).toMatchObject({
      type: 'root'
    , id: expect.any(String)
    , parent: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'table'
        , id: expect.any(String)
        , previousSibling: null
        , nextSibling: null
        , header: {
            type: 'tableRow'
          , id: expect.any(String)
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
