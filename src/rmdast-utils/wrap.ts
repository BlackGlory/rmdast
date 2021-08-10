import * as AST from './rmdast-2.0'
import { Mixin } from 'hotypes'
import { isParent, isTable } from './is'
import cloneDeep from 'lodash.clonedeep'
import { isntUndefined } from '@blackglory/types'

type NullOrWrappedNode<T extends AST.Node | null> =
  T extends null
  ? null
  : WrappedNode<NonNullable<T>>

export type WrappedNode<
  Node extends AST.Node
, Sibling extends AST.Node | null = AST.Node | null
, Parent extends AST.Node | null = AST.Node | null
> =
  Node extends AST.Root
  ? Mixin<Node, {
      parent: null
      previousSibling: null
      nextSibling: null
      children: Array<WrappedNode<AST.BlockContent, AST.BlockContent, AST.Root>>
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Paragraph>>
    }>
: Node extends AST.Heading
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Heading>>
    }>
: Node extends AST.Blockquote
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.BlockContent, AST.BlockContent, AST.Blockquote>>
    }>
: Node extends AST.List
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.ListItem, AST.ListItem, AST.List>>
    }>
: Node extends AST.ListItem
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.BlockContent, AST.BlockContent, AST.ListItem>>
    }>
: Node extends AST.Emphasis
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Emphasis>>
    }>
: Node extends AST.Strong
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Strong>>
    }>
: Node extends AST.Link
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Link>>
    }>
: Node extends AST.Table
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      header: WrappedNode<AST.TableRow, null, AST.Table>
      children: Array<WrappedNode<AST.TableRow, AST.TableRow, AST.Table>>
    }>
: Node extends AST.TableRow
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.TableCell, AST.TableCell, AST.TableRow>>
    }>
: Node extends AST.TableCell
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.TableCell>>
    }>
: Node extends AST.Delete
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<WrappedNode<AST.InlineContent, AST.InlineContent, AST.Delete>>
    }>
: Node extends AST.Footnote
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<AST.BlockContent, AST.BlockContent, AST.Footnote>
      >
    }>
: Node extends AST.InlineFootnote
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<AST.InlineContent, AST.InlineContent, AST.InlineFootnote>
      >
    }>
: Node extends AST.TextDirective
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<AST.InlineContent, AST.InlineContent, AST.TextDirective>
      >
    }>
: Node extends AST.LeafDirective
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<AST.InlineContent, AST.InlineContent, AST.LeafDirective>
      >
    }>
: Node extends AST.ContainerDirective
  ? Mixin<Node, {
      parent: NullOrWrappedNode<Parent>
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<AST.BlockContent, AST.BlockContent, AST.ContainerDirective>
      >
    }>
: Node extends AST.Gallery
  ? Mixin<Node, {
      parent: AST.Root
      previousSibling: null
      nextSibling: null
      children: Array<WrappedNode<AST.Image, AST.Image, AST.Gallery>>
    }>
: Mixin<Node, {
    parent: NullOrWrappedNode<Parent>
    previousSibling: NullOrWrappedNode<Sibling>
    nextSibling: NullOrWrappedNode<Sibling>
  }>

export function wrapAST(root: AST.Root): WrappedNode<AST.Root> {
  const newRoot = cloneDeep(root)
  wrapNode(newRoot)
  return newRoot as WrappedNode<AST.Root>
}

function wrapNode<
  Node extends AST.Node
, Parent extends AST.Node & AST.Parent
>(
  node: Node
, parent?: Parent
, index?: number
): void {
  const wrappedNode = node as WrappedNode<Node>
  wrappedNode.parent = null
  wrappedNode.previousSibling = null
  wrappedNode.nextSibling = null

  if (isntUndefined(parent)) {
    wrappedNode.parent = parent as unknown as WrappedNode<Parent>

    if (isntUndefined(index)) {
      const previousSibling =
        parent.children[index - 1] as WrappedNode<Node> | undefined
      const nextSibling =
        parent.children[index + 1] as WrappedNode<Node> | undefined

      wrappedNode.previousSibling = previousSibling ?? null
      wrappedNode.nextSibling = nextSibling ?? null
    }
  }

  if (isParent(wrappedNode)) {
    wrapChildren(wrappedNode)
  }

  if (isTable(wrappedNode)) {
    wrapNode(wrappedNode.header, wrappedNode)
  }
}

function wrapChildren<Parent extends AST.Node & AST.Parent>(parent: Parent): void { 
  parent.children.forEach((node, i) => wrapNode(node, parent, i))
}
