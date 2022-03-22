import * as RMDAST from '@src/rmdast.js'
import { isParent, isTable, isTableRow } from './is.js'
import { assert } from '@blackglory/errors'
import _flatMap from 'lodash.flatmap'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  return flatMap(node, fn)

  function flatMap(
    node: RMDAST.Node
  , fn: (node: RMDAST.Node) => RMDAST.Node[]
  ): RMDAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isTable(node)) {
        const result = flatMap(node.header, fn)
        assert(result.length === 1, 'result.length must be 1')

        const [newHeader] = result
        assert(isTableRow(newHeader), 'newHeader must be TableRow')

        node = {
          ...node
        , header: newHeader
        } as RMDAST.Node & RMDAST.Table
      }

      if (isParent(node)) {
        node = {
          ...node
        , children: _flatMap(node.children, x => flatMap(x, fn)) 
        } as RMDAST.Node & RMDAST.Parent
      }

      return node
    })
  }
}
