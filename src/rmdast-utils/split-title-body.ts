import * as RMDAST from '@src/rmdast-2.0.js'
import { isHeading, isText } from './is.js'
import { find } from './find.js'
import { findAll } from './find-all.js'
import { flatMap } from './flat-map.js'
import { wrap, WrappedNode } from './wrap.js'
import { unwrap } from './unwrap.js'
import { map, toArray } from 'iterable-operator'

export function splitTitleBody(root: RMDAST.Root): {
  title: string
  body: RMDAST.Root
} {
  const wrappedRoot = wrap(root)
  const titleNode = findTitleNode(wrappedRoot)
  const title = collectHeadingText(titleNode)
  const body = unwrap(createBody(wrappedRoot, titleNode))

  return { title, body }
}

function collectHeadingText(heading: RMDAST.Heading): string {
  const results: string[] = toArray(
    map(
      findAll<RMDAST.Text>(heading, isText)
    , text => text.value
    )
  )
  return results.join('')
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

function findTitleNode(node: WrappedNode<RMDAST.Node>): WrappedNode<RMDAST.Heading> {
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
