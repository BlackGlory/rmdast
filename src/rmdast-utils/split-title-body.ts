import * as RMDAST from '@src/rmdast.js'
import { isHeading, isText } from './is.js'
import { find } from './find.js'
import { flatMap } from './flat-map.js'
import { withHelpers, NodeWithHelpers } from './with-helpers.js'
import { removeHelpersInPlace } from './remove-helpers.js'

export function splitTitleBody(root: RMDAST.Root): {
  title: RMDAST.Heading
  body: RMDAST.Root
} {
  return withHelpers(root, ast => {
    const titleNode = findTitleNode(ast)
    const body = createBody(ast, titleNode)

    return {
      title: removeHelpersInPlace(titleNode)
    , body: removeHelpersInPlace(body)
    }
  })
}

function createBody(
  root: NodeWithHelpers<RMDAST.Root>
, titleNode: NodeWithHelpers<RMDAST.Heading>
): NodeWithHelpers<RMDAST.Root> {
  return flatMap(
    root
  , node => (node as NodeWithHelpers<RMDAST.Node>).id === titleNode.id
          ? []
          : [node]
  )[0] as NodeWithHelpers<RMDAST.Root>
}

function findTitleNode(node: NodeWithHelpers<RMDAST.Node>): NodeWithHelpers<RMDAST.Heading> {
  const heading = find<NodeWithHelpers<RMDAST.Heading>>(
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
