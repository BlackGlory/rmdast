import * as RMDAST from '@src/rmdast.js'
import { isParent, isTable, isTableRow } from './is.js'
import cloneDeep from 'lodash.clonedeep'
import { assert } from '@blackglory/errors'
import 'core-js/features/array/flat.js'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  return flatMap(cloneDeep(node), fn)

  function flatMap(
    node: RMDAST.Node
  , fn: (node: RMDAST.Node) => RMDAST.Node[]
  ): RMDAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isTable(node)) {
        const result = flatMap(node.header, fn)
        assert(result.length === 1)

        const [newHeader] = result
        assert(isTableRow(newHeader))

        node.header = newHeader
      }

      if (isParent(node)) {
        node.children = node.children.map(x => flatMap(x, fn)).flat()
      }

      return node
    })
  }
}
