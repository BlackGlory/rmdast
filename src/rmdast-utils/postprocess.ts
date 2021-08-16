import * as RMDAST from '@src/rmdast-2.0.js'
import { filter } from './filter.js'
import { flatMap } from './flat-map.js'
import { map } from './map.js'
import { isParent, isParagraph, isList, isImage, isText, isInlineImage } from './is.js'
import { text, image, gallery } from './builder.js'

export function transformImageOnlyListToGallery(root: RMDAST.Root): RMDAST.Root {
  const newChildren = root.children.map(node => {
    if (isList(node) && node.children.every(item => item.children.every(isImage))) {
      return gallery(node.children.map(item => item.children as RMDAST.Image[]).flat())
    } else {
      return node
    }
  })
  return { ...root, children: newChildren }
}

export function removeEmptyParagraph(root: RMDAST.Root): RMDAST.Root {
  return filter(
    root
  , node => !(isParagraph(node) && node.children.length === 0)
  ) as RMDAST.Root
}

export function concatContinuousText(root: RMDAST.Root): RMDAST.Root {
  return map(
    root
  , node => {
      if (isParent(node)) {
        const newChildren: RMDAST.Node[] = node.children.reduce(
          (acc: RMDAST.Node[], cur: RMDAST.Node) => {
            const lastNode = last(acc)
            if (lastNode && isText(cur) && isText(lastNode)) {
              const newText = text(lastNode.value + cur.value)
              return [...acc.slice(0, -1), newText]
            } else {
              return [...acc, cur]
            }
          }
        , []
        )
        return { ...node, children: newChildren }
      }
      return node
    }
  ) as RMDAST.Root
}

export function transofrmInlineImageToImage(root: RMDAST.Root): RMDAST.Root {
  return flatMap(root, node => {
    if (isParagraph(node) && node.children.every(isInlineImage)) {
      return node.children.map(x => image(x.url, { title: x.title, alt: x.alt }))
    }

    return [node]
  })[0] as RMDAST.Root
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
