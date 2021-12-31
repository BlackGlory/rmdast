import * as RMDAST from '@src/rmdast.js'
import { isParent, isTable, isTableRow } from './is.js'
import { assert } from '@blackglory/errors'

export function map(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node
): RMDAST.Node {
  return map(node, fn)

  function map(
    node: RMDAST.Node
  , fn: (node: RMDAST.Node) => RMDAST.Node
  ): RMDAST.Node {
    let newNode = fn(node)

    if (isTable(newNode)) {
      const newHeader = map(newNode.header, fn)
      assert(isTableRow(newHeader))

      newNode = {
        ...newNode
      , header: newHeader
      } as RMDAST.Node & RMDAST.Table
    }

    if (isParent(newNode)) {
      newNode = {
        ...newNode
      , children: newNode.children.map(x => map(x, fn))
      } as RMDAST.Node & RMDAST.Parent
    }

    return newNode
  }
}
