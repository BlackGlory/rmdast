import * as RMDAST from './rmdast-2.0'
import { isParent } from './is'

export function find<T extends RMDAST.Node>(node: RMDAST.Node, predicate: (node: RMDAST.Node) => boolean): T | undefined {
  try {
    findThenThrow(node, predicate)
  } catch (result) {
    return result
  }
}

function findThenThrow(node: RMDAST.Node, predicate: (node: RMDAST.Node) => boolean): void {
  if (predicate(node)) throw node
  if (isParent(node)) node.children.forEach(x => findThenThrow(x, predicate))
}
