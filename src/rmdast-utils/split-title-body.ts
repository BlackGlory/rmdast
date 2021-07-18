import { Node, Root, Text, Heading } from '@src/rmdast-1.0'
import { isHeading, isText } from '@src/is'
import { find } from './find'
import { flatMap } from './flat-map'

interface Title extends Heading {
  children: Text[]
}

export function splitTitleBody(root: Root): { title: string, body: Root } {
  const titleNode = getTitleNode(root)
  const title = titleNode.children.map(x => x.value).join('')
  return {
    title
  , body: getBody(root, titleNode)
  }
}

function getBody(root: Root, titleNode: Title): Root {
  return flatMap(root, node => node === titleNode ? [] : [node])[0] as Root
}

function getTitleNode(node: Node): Title {
  const heading = find<Title>(node, node =>
     isHeading(node)
  && node.depth === 1
  && node.children.length > 0
  && node.children.every(isText)
  )
  if (heading) {
    return heading
  } else {
    throw new Error('Title does not exist')
  }
}
