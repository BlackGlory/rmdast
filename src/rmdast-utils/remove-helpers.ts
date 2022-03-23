import * as AST from '@src/rmdast.js'
import { NodeWithHelpers } from './add-helpers.js'
import { isParent, isTable } from './is.js'
import cloneDeep from 'lodash/cloneDeep.js'

export function removeHelpers<T extends AST.Node>(node: NodeWithHelpers<T>): T {
  return removeHelpersInPlace(cloneDeep(node))
}

export function removeHelpersInPlace<T extends AST.Node>(node: NodeWithHelpers<T>): T {
  removeHelpersForTree(node)
  return node as T
}

function removeHelpersForTree<T extends AST.Node>(node: NodeWithHelpers<T>): void {
  delete (node as Partial<NodeWithHelpers<T>>).parent
  delete (node as Partial<NodeWithHelpers<T>>).previousSibling
  delete (node as Partial<NodeWithHelpers<T>>).nextSibling
  delete (node as Partial<NodeWithHelpers<T>>).id
  delete (node as Partial<NodeWithHelpers<T>>).index

  if (isParent(node)) {
    removeHelpersForChildren(node)
  }

  if (isTable(node)) {
    removeHelpersForTree(node.header as NodeWithHelpers<AST.TableRow>)
  }
}

function removeHelpersForChildren(parent: NodeWithHelpers<AST.Node & AST.Parent>): void {
  parent.children.forEach(node => {
    removeHelpersForTree(node as NodeWithHelpers<AST.Node>)
  })
}
