import * as AST from './rmdast-2.0.js'
import { WrappedNode } from './wrap.js'
import { isParent, isTable } from './is'
import cloneDeep from 'lodash.clonedeep'

export function unwrapAST<T extends AST.Node>(node: WrappedNode<T>): T {
  const clone = cloneDeep(node)
  unwrapNode(clone)
  return clone as T
}

function unwrapNode<T extends AST.Node>(node: WrappedNode<T>): void {
  delete (node as Partial<WrappedNode<T>>).parent
  delete (node as Partial<WrappedNode<T>>).previousSibling
  delete (node as Partial<WrappedNode<T>>).nextSibling

  if (isParent(node)) {
    unwrapChildren(node)
  }

  if (isTable(node)) {
    unwrapNode(node.header as WrappedNode<AST.TableRow>)
  }
}

function unwrapChildren(parent: WrappedNode<AST.Node & AST.Parent>): void {
  parent.children.forEach(node => unwrapNode(node as WrappedNode<AST.Node>))
}
