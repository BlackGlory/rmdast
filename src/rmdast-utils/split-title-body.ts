import * as RMDAST from './rmdast-2.0.js'
import { isHeading, isText } from './is.js'
import { find } from './find.js'
import { flatMap } from './flat-map.js'

export function splitTitleBody(root: RMDAST.Root): { title: string, body: RMDAST.Root } {
  const titleNode = findTitleNode(root)
  const title = titleNode.children.filter(isText).map(x => x.value).join('')
  const body = createBody(root, titleNode)

  return { title, body }
}

function createBody(root: RMDAST.Root, titleNode: RMDAST.Heading): RMDAST.Root {
  return flatMap(
    root
  , node => node === titleNode
          ? []
          : [node]
  )[0] as RMDAST.Root
}

function findTitleNode(node: RMDAST.Node): RMDAST.Heading {
  const heading = find<RMDAST.Heading>(
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
