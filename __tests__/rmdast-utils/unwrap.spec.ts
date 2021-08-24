import { wrap } from '@rmdast-utils/wrap.js'
import { unwrap } from '@rmdast-utils/unwrap.js'
import * as R from '@rmdast-utils/builder.js'

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
