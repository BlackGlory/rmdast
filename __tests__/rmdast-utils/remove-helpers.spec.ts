import { addHelpersInPlace } from '@rmdast-utils/add-helpers.js'
import { removeHelpersInPlace } from '@rmdast-utils/remove-helpers.js'
import * as R from '@rmdast-utils/builder.js'

describe('removeHelpers', () => {
  test('root', () => {
    const ast = addHelpersInPlace(
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

    const result = removeHelpersInPlace(ast)

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
    const ast = addHelpersInPlace(
      R.root([
        R.table(
          R.tableRow([])
        , []
        )
      ])
    )

    const result = removeHelpersInPlace(ast)

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
