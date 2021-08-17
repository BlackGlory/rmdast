import { wrap } from '@src/rmdast-utils/wrap.js'
import { unwrap } from '@src/rmdast-utils/unwrap.js'
import * as R from '@src/rmdast-utils/builder.js'

describe('unwrap', () => {
  test('root', () => {
    const ast = wrap(
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

    const result = unwrap(ast)

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
    const ast = wrap(
      R.root([
        R.table(
          R.tableRow([])
        , []
        )
      ])
    )

    const result = unwrap(ast)

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