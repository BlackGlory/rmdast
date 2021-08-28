import * as RMDAST from '@src/rmdast.js'
import { isParent, isTable, isTableRow } from './is.js'
import { assert } from '@blackglory/errors'
import cloneDeep from 'lodash.clonedeep'

export function map(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node
): RMDAST.Node {
  return map(cloneDeep(node), fn)

  function map(
    node: RMDAST.Node
  , fn: (node: RMDAST.Node) => RMDAST.Node
  ): RMDAST.Node {
    const newNode = fn(node)

    if (isTable(newNode)) {
      const newHeader = map(newNode.header, fn)
      assert(isTableRow(newHeader))

      newNode.header = newHeader
    }

    if (isParent(newNode)) {
      newNode.children = newNode.children.map(x => map(x, fn))
    }

    return newNode
  }
}
