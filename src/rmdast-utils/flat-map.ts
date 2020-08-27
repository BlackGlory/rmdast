import * as AST from '@src/ast'
import { isParent, isComponent } from '@src/is'
import { produce, original } from 'immer'
import 'core-js/es/array/flat-map'

export function flatMap(node: AST.Node, fn: (node: AST.Node) => AST.Node[]): AST.Node[] {
  const newNodes = fn(node)
  return newNodes.map(node => produce(node, node => {
    if (isParent(node) && !isComponent(node)) {
      node.children = original(node)!.children.flatMap(x => flatMap(x, fn))
    }
  }))
}
