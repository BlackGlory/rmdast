import * as RMDAST from '@src/rmdast.js'
import { isParent, isTable } from './is.js'

export function* traverseDescendantNodes(node: RMDAST.Node): Iterable<RMDAST.Node> {
  if (isTable(node)) {
    yield node.header
    yield* traverseDescendantNodes(node.header)
  }

  if (isParent(node)) {
    for (const childNode of node.children) {
      yield childNode
      yield* traverseDescendantNodes(childNode)
    }
  }
}
