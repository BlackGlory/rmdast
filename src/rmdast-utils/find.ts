import * as RMDAST from '@src/rmdast-1.0'
import { isParent, isComponent } from '@src/is'

export function find<T extends RMDAST.Node>(node: RMDAST.Node, predicate: (node: RMDAST.Node) => boolean): T | undefined {
  try {
    findThenThrow(node, predicate)
  } catch (result) {
    return result
  }
}

function findThenThrow(node: RMDAST.Node, predicate: (node: RMDAST.Node) => boolean): void {
  if (predicate(node)) throw node
  if (isParent(node) && !isComponent(node)) node.children.forEach(x => findThenThrow(x, predicate))
}
