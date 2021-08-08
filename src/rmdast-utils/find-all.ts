import * as RMDAST from './rmdast-2.0'
import { traverseDescendantNodes } from './traverse-descendant-nodes'
import { isParent } from './is'
import { filter } from 'iterable-operator'

export function* findAll<T extends RMDAST.Node>(
  node: RMDAST.Node
, predicate: (node: RMDAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T
  if (isParent(node)) {
    yield* filter(traverseDescendantNodes(node), node => predicate(node))
  }
}
