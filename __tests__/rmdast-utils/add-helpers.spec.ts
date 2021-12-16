import { addHelpers } from '@rmdast-utils/add-helpers.js'
import * as R from '@rmdast-utils/builder.js'

describe('addHelpers', () => {
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

    const result = addHelpers(ast)

    expect(result).toMatchObject({
      type: 'root'
    , id: expect.any(String)
    , parent: null
    , index: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 0
        , previousSibling: null
        , children: [
            {
              type: 'text'
            , value: 'first'
            , index: 0
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 1
        , children: [
            {
              type: 'text'
            , value: 'middle'
            , index: 0
            , previousSibling: null
            , nextSibling: null
            }
          ]
        }
      , {
          type: 'paragraph'
        , id: expect.any(String)
        , index: 2
        , nextSibling: null
        , children: [
            {
              type: 'text'
            , value: 'last'
            , index: 0
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

    const result = addHelpers(ast)

    expect(result).toMatchObject({
      type: 'root'
    , id: expect.any(String)
    , parent: null
    , index: null
    , previousSibling: null
    , nextSibling: null
    , children: [
        {
          type: 'table'
        , id: expect.any(String)
        , index: 0
        , previousSibling: null
        , nextSibling: null
        , header: {
            type: 'tableRow'
          , id: expect.any(String)
          , children: []
          , index: null
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
