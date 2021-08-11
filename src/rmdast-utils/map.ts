import * as RMDAST from './rmdast-2.0'
import { isParent } from './is'
import { produce, original } from 'immer'

export function map(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node
): RMDAST.Node {
  const newNode = fn(node)
  return produce(newNode, node => {
    if (isParent(node)) {
      node.children = node.children.map(x => map(original(x)!, fn))
    }
  })
}
