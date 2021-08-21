import * as AST from '@src/rmdast.js'
import { WrappedNode } from './wrap.js'
import { isParent, isTable } from './is.js'
import cloneDeep from 'lodash.clonedeep'

export function unwrap<T extends AST.Node>(node: WrappedNode<T>): T {
  const clone = cloneDeep(node)
  unwrapNode(clone)
  return clone as T
}

function unwrapNode<T extends AST.Node>(node: WrappedNode<T>): void {
  delete (node as Partial<WrappedNode<T>>).parent
  delete (node as Partial<WrappedNode<T>>).previousSibling
  delete (node as Partial<WrappedNode<T>>).nextSibling
  delete (node as Partial<WrappedNode<T>>).id

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
