import * as RMDAST from '@src/rmdast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { filter } from 'iterable-operator'

export function* findAll<T extends RMDAST.Node>(
  node: RMDAST.Node
, predicate: (node: RMDAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T

  yield* filter(traverseDescendantNodes(node), node => predicate(node))
}
