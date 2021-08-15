import * as RMDAST from './rmdast-2.0.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { isParent } from './is.js'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends RMDAST.Node>(
  node: RMDAST.Node
, predicate: (node: RMDAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T
  if (isParent(node)) {
    const result = findInIterable(
      traverseDescendantNodes(node)
    , node => predicate(node)
    )
    if (result) return result as T
  }
  return undefined
}
