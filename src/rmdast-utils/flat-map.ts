import * as RMDAST from '@src/rmdast-2.0.js'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  const newNodes = fn(cloneDeep(node))
  return newNodes.map(node => {
    if (isParent(node)) {
      node.children = node.children.map(x => flatMap(x, fn)).flat()
    }
    return node
  })
}
