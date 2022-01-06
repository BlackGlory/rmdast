import * as AST from '@src/rmdast.js'
import { addHelpersInPlace, NodeWithHelpers } from './add-helpers.js'
import { removeHelpersInPlace } from './remove-helpers.js'
export { NodeWithHelpers } from './add-helpers.js'

export function withHelpers<T extends AST.Node, U>(
  node: T
, handler: (node: NodeWithHelpers<T>) => U
): U {
  const nodeWithHelpers = addHelpersInPlace(node)
  try {
    return handler(nodeWithHelpers)
  } finally {
    removeHelpersInPlace(nodeWithHelpers)
  }
}
