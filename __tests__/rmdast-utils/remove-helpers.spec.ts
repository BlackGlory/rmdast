import { addHelpers } from '@rmdast-utils/add-helpers.js'
import { removeHelpers } from '@rmdast-utils/remove-helpers.js'
import * as R from '@rmdast-utils/builder.js'

describe('removeHelpers', () => {
  test('root', () => {
    const ast = addHelpers(
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

    const result = removeHelpers(ast)

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
    const ast = addHelpers(
      R.root([
        R.table(
          R.tableRow([])
        , []
        )
      ])
    )

    const result = removeHelpers(ast)

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
