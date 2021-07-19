import * as RMDAST from './rmdast-2.0'
import { isParent } from './is'
import { produce, original } from 'immer'
import { map, flatten, toArray } from 'iterable-operator'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  const newNodes = fn(node)
  return newNodes.map(node => produce(node, node => {
    if (isParent(node)) {
      node.children = toArray(
        flatten(
          map(
            node.children
          , node => flatMap(original(node)!, fn)
          )
        )
      )
    }
  }))
}
