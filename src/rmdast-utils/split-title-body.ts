import * as RMDAST from './rmdast-2.0'
import { isHeading, isText } from './is'
import { find } from './find'
import { flatMap } from './flat-map'

export function splitTitleBody(root: RMDAST.Root): { title: string, body: RMDAST.Root } {
  const titleNode = getTitleNode(root)
  const title = titleNode.children.filter(isText).map(x => x.value).join('')
  const body = getBody(root, titleNode)

  return { title, body }
}

function getBody(root: RMDAST.Root, titleNode: RMDAST.Heading): RMDAST.Root {
  return flatMap(
    root
  , node => node === titleNode
          ? []
          : [node]
  )[0] as RMDAST.Root
}

function getTitleNode(node: RMDAST.Node): RMDAST.Heading {
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
