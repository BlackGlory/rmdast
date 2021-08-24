import * as RMDAST from '@src/rmdast.js'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'
import 'core-js/features/array/flat.js'

export function flatMap(
  node: RMDAST.Node
, fn: (node: RMDAST.Node) => RMDAST.Node[]
): RMDAST.Node[] {
  return flatMap(cloneDeep(node), fn)

  function flatMap(
    node: RMDAST.Node
  , fn: (node: RMDAST.Node) => RMDAST.Node[]
  ): RMDAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isParent(node)) {
        node.children = node.children.map(x => flatMap(x, fn)).flat()
      }
      return node
    })
  }
}
