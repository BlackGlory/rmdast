import * as AST from '@src/ast'
import { isParent, isComponent } from '@src/is'
import { produce, original } from 'immer'

export function map(node: AST.Node, fn: (node: AST.Node) => AST.Node): AST.Node {
  const newNode = fn(node)
  return produce(newNode, node => {
    if (isParent(node) && !isComponent(node)) {
      node.children = original(node)!.children.map(x => map(x, fn))
    }
  })
}
