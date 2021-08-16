import { wrapAST } from '@src/rmdast-utils/wrap.js'
import { unwrapAST } from '@src/rmdast-utils/unwrap.js'
import * as R from '@src/rmdast-utils/builder.js'

describe('unwrapAST', () => {
  test('root', () => {
    const ast = wrapAST(
      R.root([
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
    )

    const result = unwrapAST(ast)

    expect(result).toStrictEqual(
      R.root([
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
    )
  })

  test('table.header', () => {
    const ast = wrapAST(
      R.root([
        R.table(
          R.tableRow([])
        , []
        )
      ])
    )

    const result = unwrapAST(ast)

    expect(result).toStrictEqual(
      R.root([
        R.table(
          R.tableRow([])
        , []
        )
      ])
    )
  })
})
