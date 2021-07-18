import * as RMDAST from '@src/rmdast-1.0'
import { isParent, isComponent } from '@src/is'
import { produce, original } from 'immer'

export function map(node: RMDAST.Node, fn: (node: RMDAST.Node) => RMDAST.Node): RMDAST.Node {
  const newNode = fn(node)
  return produce(newNode, node => {
    if (isParent(node) && !isComponent(node)) {
      node.children = node.children.map(x => map(original(x)!, fn))
    }
  })
}
