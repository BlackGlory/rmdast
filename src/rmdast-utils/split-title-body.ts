import * as RMDAST from '@src/rmdast.js'
import { isHeading, isText } from './is.js'
import { find } from './find.js'
import { flatMap } from './flat-map.js'
import { wrap, WrappedNode } from './wrap.js'
import { unwrap } from './unwrap.js'

export function splitTitleBody(root: RMDAST.Root): {
  title: RMDAST.Heading
  body: RMDAST.Root
} {
  const wrappedRoot = wrap(root)
  const titleNode = findTitleNode(wrappedRoot)
  const body = createBody(wrappedRoot, titleNode)

  return {
    title: unwrap(titleNode)
  , body: unwrap(body)
  }
}

function createBody(
  root: WrappedNode<RMDAST.Root>
, titleNode: WrappedNode<RMDAST.Heading>
): WrappedNode<RMDAST.Root> {
  return flatMap(
    root
  , node => (node as WrappedNode<RMDAST.Node>).id === titleNode.id
          ? []
          : [node]
  )[0] as WrappedNode<RMDAST.Root>
}

function findTitleNode(node: WrappedNode<RMDAST.Root>): WrappedNode<RMDAST.Heading> {
  const heading = find<WrappedNode<RMDAST.Heading>>(
    node
  , node => isHeading(node)
         && node.depth === 1
         && node.children.length > 0
         && node.children.every(isText)
  )

  if (heading) {
    return heading
  } else {
    throw new Error('There is no title')
  }
}
