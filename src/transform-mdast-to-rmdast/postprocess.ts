import * as RMDAST from '@src/rmdast.js'
import { filter } from '@rmdast-utils/filter.js'
import { flatMap } from '@rmdast-utils/flat-map.js'
import { map } from '@rmdast-utils/map.js'
import {
  isParent
, isParagraph
, isList
, isImage
, isText
, isInlineImage
} from '@rmdast-utils/is.js'
import { text, newline, image, gallery } from '@rmdast-utils/builder.js'
import { flatten, map as iterMap, toArray } from 'iterable-operator'
import { pipe } from 'extra-utils'

export function postprocess(root: RMDAST.Root): RMDAST.Root {
  return pipe(
    root
  , concatContinuousText
  , transformTextToNewline
  , removeEmptyParagraph
  , transformInlineImageToImage
  , transformImageOnlyListToGallery
  )
}

function transformImageOnlyListToGallery(root: RMDAST.Root): RMDAST.Root {
  const newChildren = root.children.map(node => {
    if (isList(node) && node.children.every(item => item.children.every(isImage))) {
      return gallery(
        toArray(flatten(iterMap(node.children, item => item.children as RMDAST.Image[])))
      )
    } else {
      return node
    }
  })
  return { ...root, children: newChildren }
}

function removeEmptyParagraph(root: RMDAST.Root): RMDAST.Root {
  return filter(
    root
  , node => !(isParagraph(node) && node.children.length === 0)
  ) as RMDAST.Root
}

function concatContinuousText(root: RMDAST.Root): RMDAST.Root {
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

function transformTextToNewline(root: RMDAST.Root): RMDAST.Root {
  return flatMap(root, node => {
    if (isText(node)) {
      const lines = node.value.split('\n')
      const result: Array<RMDAST.Text | RMDAST.Newline> = []
      for (const line of lines) {
        result.push(text(line))
        result.push(newline())
      }
      result.pop()
      return result
    }

    return [node]
  })[0] as RMDAST.Root
}

function transformInlineImageToImage(root: RMDAST.Root): RMDAST.Root {
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
