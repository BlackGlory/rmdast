import * as RMDAST from '@src/rmdast-2.0.js'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'

export function map(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node
): RMDAST.Node {
  const newNode = fn(cloneDeep(node))
  if (isParent(newNode)) {
    newNode.children = newNode.children.map(x => map(x, fn))
  }
  return newNode
}
