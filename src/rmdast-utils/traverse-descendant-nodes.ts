import * as RMDAST from '@src/rmdast.js'
import { isParent } from './is.js'

export function* traverseDescendantNodes(
  parent: RMDAST.Parent
): Iterable<RMDAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
