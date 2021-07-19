import * as RMDAST from './rmdast-2.0'
import { isParent } from './is'
import { produce, original } from 'immer'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  const newNodes = fn(node)
  return newNodes.map(node => produce(node, node => {
    if (isParent(node)) {
      node.children = node.children.map(node => flatMap(original(node)!, fn)).flat()
    }
  }))
}
