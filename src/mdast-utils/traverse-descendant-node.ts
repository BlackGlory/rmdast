import * as MDAST from './mdast-4.0'
import { isParent } from './is'

export function* traverseDescendantNodes(parent: MDAST.Parent): Iterable<MDAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
