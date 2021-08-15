import * as MDAST from './mdast-4.0.js'
import { traverseDescendantNodes } from './traverse-descendant-node.js'
import { isParent } from './is.js'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends MDAST.Node>(
  node: MDAST.Node
, predicate: (node: MDAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T
  if (isParent(node)) {
    const result = findInIterable(traverseDescendantNodes(node), node => predicate(node))
    if (result) return result as T
  }
  return undefined
}
