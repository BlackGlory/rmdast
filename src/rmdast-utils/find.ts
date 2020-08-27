import * as AST from '@src/ast'
import { isParent, isComponent } from '@src/is'

export function find(node: AST.Node, predicate: (node: AST.Node) => boolean): AST.Node | undefined {
  try {
    findThenThrow(node, predicate)
  } catch (result) {
    return result
  }
}

function findThenThrow(node: AST.Node, predicate: (node: AST.Node) => boolean): void {
  if (predicate(node)) throw node
  if (isParent(node) && !isComponent(node)) node.children.forEach(x => findThenThrow(x, predicate))
}
