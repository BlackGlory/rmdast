import { Parent, Node } from './rmdast-2.0'
import { isParent } from './is'

export function* traverseDescendantNodes(parent: Parent): Iterable<Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
