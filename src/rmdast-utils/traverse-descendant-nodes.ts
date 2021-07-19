import * as RMDAST from './rmdast-2.0'
import { isParent } from './is'

export function* traverseDescendantNodes(parent: RMDAST.Parent): Iterable<RMDAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
