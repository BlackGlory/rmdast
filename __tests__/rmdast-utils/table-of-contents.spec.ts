import { createTableOfContents } from '@src/rmdast-utils/table-of-contents.js'
import * as R from '@src/rmdast-utils/builder.js'
import * as AST from '@src/rmdast.js'
import { isHeading, isText } from '@src/rmdast-utils/is.js'
import { findAll } from '@src/rmdast-utils/find-all'
import { WrappedNode } from '@src/rmdast-utils/wrap'
import { map, toArray } from 'iterable-operator'

describe('createTableOfContents(root: AST.Root): TableOfContents', () => {
  test('standard: single tree', () => {
    const ast = R.root([
      R.heading(1, [R.text('a')])
    , R.heading(2, [R.text('b')])
    , R.heading(3, [R.text('c')])
    , R.heading(2, [R.text('d')])
    , R.heading(3, [R.text('e')])
    ])

    const result = createTableOfContents(ast, {
      createHeadingURL
    , createHeadingText
    })

    expect(result).toStrictEqual([
      {
        text: 'a'
      , url: '#a'
      , level: 1
      , children: [
          {
            text: 'b'
          , url: '#a_b'
          , level: 2
          , children: [
              {
                text: 'c'
              , url: '#a_b_c'
              , level: 3
              , children: []
              }
            ]
          }
        , {
            text: 'd'
          , url: '#a_d'
          , level: 2
          , children: [
              {
                text: 'e'
              , url: '#a_d_e'
              , level: 3
              , children: []
              }
            ]
          }
        ]
      }
    ])
  })

  test('standard: multiple tree', () => {
    const ast = R.root([
      R.heading(2, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(2, [R.text('c')])
    , R.heading(3, [R.text('d')])
    ])

    const result = createTableOfContents(ast, {
      createHeadingURL
    , createHeadingText
    })

    expect(result).toStrictEqual([
      {
        text: 'a'
      , url: '#a'
      , level: 1
      , children: [
          {
            text: 'b'
          , url: '#a_b'
          , level: 2
          , children: []
          }
        ]
      }
    , {
        text: 'c'
      , url: '#c'
      , level: 1
      , children: [
          {
            text: 'd'
          , url: '#c_d'
          , level: 2
          , children: []
          }
        ]
      }
    ])
  })

  test('edge: first heading isnt shallowest depth', () => {
    const ast = R.root([
      R.heading(2, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(1, [R.text('c')])
    , R.heading(2, [R.text('d')])
    ])

    const result = createTableOfContents(ast, {
      createHeadingURL
    , createHeadingText
    })

    expect(result).toStrictEqual([
      {
        text: 'a'
      , url: '#a'
      , level: 1
      , children: [
          {
            text: 'b'
          , url: '#a_b'
          , level: 2
          , children: []
          }
        ]
      }
    , {
        text: 'c'
      , url: '#c'
      , level: 1
      , children: [
          {
            text: 'd'
          , url: '#c_d'
          , level: 2
          , children: []
          }
        ]
      }
    ])
  })

  test('edge: heading depth crossing', () => {
    const ast = R.root([
      R.heading(1, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(2, [R.text('c')])
    ])

    const result = createTableOfContents(ast, {
      createHeadingURL
    , createHeadingText
    })

    expect(result).toStrictEqual([
      {
        text: 'a'
      , url: '#a'
      , level: 1
      , children: [
          {
            text: 'b'
          , url: '#a_b'
          , level: 2
          , children: []
          }
        , {
            text: 'c'
          , url: '#a_c'
          , level: 2
          , children: []
          }
        ]
      }
    ])
  })
})

function createHeadingURL(heading: WrappedNode<AST.Heading>): string {
  const results: string[] = []

  let lastHeadingDepth = Infinity
  let current: WrappedNode<AST.Node> | null = heading
  while (current !== null) {
    if (isHeading(current) && current.depth < lastHeadingDepth) {
      lastHeadingDepth = current.depth
      results.unshift(createHeadingText(current))
    }

    if (current.previousSibling) {
      current = current.previousSibling
    } else {
      current = current.parent
    }
  }

  return '#' + results
    .map(replaceWhitespaceToHyphen) 
    .join('_')

  function replaceWhitespaceToHyphen(text: string): string {
    return text.replace(/\s+/g, '-')
  }
}

function createHeadingText(heading: AST.Heading): string {
  const results: string[] = toArray(
    map(
      findAll<AST.Text>(heading, isText)
    , text => text.value
    )
  )
  return results.join('')
}
