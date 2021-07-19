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
      const newChildNodes: RMDAST.Node[] = []
      for (const childNode of node.children) {
        newChildNodes.push(...flatMap(original(childNode)!, fn))
      }
      node.children = newChildNodes
    }
  }))
}
