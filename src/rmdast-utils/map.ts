import * as RMDAST from '@src/rmdast.js'
import { isParent } from './is.js'
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
    if (isParent(newNode)) {
      newNode.children = newNode.children.map(x => map(x, fn))
    }
    return newNode
  }
}
