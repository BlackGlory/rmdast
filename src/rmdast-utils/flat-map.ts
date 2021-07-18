import * as RMDAST from '@src/rmdast-1.0'
import { isParent, isComponent } from '@src/is'
import { produce, original } from 'immer'
import 'core-js/es/array/flat-map'

export function flatMap(node: RMDAST.Node, fn: (node: RMDAST.Node) => RMDAST.Node[]): RMDAST.Node[] {
  const newNodes = fn(node)
  return newNodes.map(node => produce(node, node => {
    if (isParent(node) && !isComponent(node)) {
      node.children = node.children.flatMap(x => flatMap(original(x)!, fn))
    }
  }))
}
