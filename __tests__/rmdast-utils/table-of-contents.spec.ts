import { createTableOfContents } from '@src/rmdast-utils/table-of-contents'
import * as R from '@src/rmdast-utils/builder'
import * as AST from '@src/rmdast-utils/rmdast-2.0'
import { isHeading, isText } from '@src/rmdast-utils/is'
import { findAll, WrappedNode } from '@src/rmdast-utils'
import { map, toArray } from 'iterable-operator'

describe('createTableOfContents(root: AST.Root): AST.List', () => {
  test('standard: single tree', () => {
    const ast = R.root([
      R.heading(1, [R.text('a')])
    , R.heading(2, [R.text('b')])
    , R.heading(3, [R.text('c')])
    , R.heading(2, [R.text('d')])
    , R.heading(3, [R.text('e')])
    ])

    const result = createTableOfContents(ast, {
      createLinkURL
    , createLinkText
    })

    expect(result).toStrictEqual(
      R.list([
        R.listItem([
          R.paragraph([R.link('#a', [R.text('a')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#a_b', [R.text('b')])])
            , R.list([
                R.listItem([
                  R.paragraph([R.link('#a_b_c', [R.text('c')])])
                ])
              ])
            ])
          , R.listItem([
              R.paragraph([R.link('#a_d', [R.text('d')])])
            , R.list([
                R.listItem([
                  R.paragraph([R.link('#a_d_e', [R.text('e')])])
                ])
              ])
            ])
          ])
        ])
      ])
    )
  })

  test('standard: multiple tree', () => {
    const ast = R.root([
      R.heading(2, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(2, [R.text('c')])
    , R.heading(3, [R.text('d')])
    ])

    const result = createTableOfContents(ast, {
      createLinkURL
    , createLinkText
    })

    expect(result).toStrictEqual(
      R.list([
        R.listItem([
          R.paragraph([R.link('#a', [R.text('a')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#a_b', [R.text('b')])])
            ])
          ])
        ])
      , R.listItem([
          R.paragraph([R.link('#c', [R.text('c')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#c_d', [R.text('d')])])
            ])
          ])
        ])
      ])
    )
  })

  test('edge: first heading isnt shallowest depth', () => {
    const ast = R.root([
      R.heading(2, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(1, [R.text('c')])
    , R.heading(2, [R.text('d')])
    ])

    const result = createTableOfContents(ast, {
      createLinkURL
    , createLinkText
    })

    expect(result).toStrictEqual(
      R.list([
        R.listItem([
          R.paragraph([R.link('#a', [R.text('a')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#a_b', [R.text('b')])])
            ])
          ])
        ])
      , R.listItem([
          R.paragraph([R.link('#c', [R.text('c')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#c_d', [R.text('d')])])
            ])
          ])
        ])
      ])
    )
  })

  test('edge: heading depth crossing', () => {
    const ast = R.root([
      R.heading(1, [R.text('a')])
    , R.heading(3, [R.text('b')])
    , R.heading(2, [R.text('c')])
    ])

    const result = createTableOfContents(ast, {
      createLinkURL
    , createLinkText
    })

    expect(result).toStrictEqual(
      R.list([
        R.listItem([
          R.paragraph([R.link('#a', [R.text('a')])])
        , R.list([
            R.listItem([
              R.paragraph([R.link('#a_b', [R.text('b')])])
            ])
          , R.listItem([
              R.paragraph([R.link('#a_c', [R.text('c')])])
            ])
          ])
        ])
      ])
    )
  })
})

function createLinkURL(heading: WrappedNode<AST.Heading>): string {
  const results: string[] = []

  let lastHeadingDepth = Infinity
  let current: WrappedNode<AST.Node> | null = heading
  while (current !== null) {
    if (isHeading(current) && current.depth < lastHeadingDepth) {
      lastHeadingDepth = current.depth
      results.unshift(createLinkText(current))
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

function createLinkText(heading: AST.Heading): string {
  const results: string[] = toArray(
    map(
      findAll<AST.Text>(heading, isText)
    , text => text.value
    )
  )
  return results.join('')
}
