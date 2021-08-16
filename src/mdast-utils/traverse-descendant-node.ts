import * as MDAST from '@src/mdast-4.0.js'
import { isParent } from './is.js'

export function* traverseDescendantNodes(parent: MDAST.Parent): Iterable<MDAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
