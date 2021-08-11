import * as AST from './rmdast-2.0'
import { isHeading } from './is'
import { findAll } from './find-all'
import { wrapAST, WrappedNode } from './wrap'
import { list, listItem, paragraph, link, text } from './builder'

type TableOfContents = Level[]
type Level = [heading: WrappedNode<AST.Heading>, ...children: Level[]]

export function createTableOfContents(
  root: AST.Root
, { createLinkText, createLinkURL }: {
    createLinkText: (heading: WrappedNode<AST.Heading>) => string
  , createLinkURL: (heading: WrappedNode<AST.Heading>) => string
  }
): AST.List {
  const ast = wrapAST(root)

  const tableOfContents: TableOfContents = []
  const stack: Level[] = []
  for (const heading of findAll<WrappedNode<AST.Heading>>(ast, isHeading)) {
    const level: Level = [heading]

    while (true) {
      if (stack.length === 0) {
        tableOfContents.push(level)
        break
      } else {
        if (heading.depth > last(stack)[0].depth) {
          last(stack).push(level)
          break
        } else {
          stack.pop()
        }
      }
    }

    stack.push(level)
  }

  return translateTableOfContentsToRMDAST(tableOfContents)

  function translateTableOfContentsToRMDAST(toc: TableOfContents): AST.List {
    return list(toc.map(translateLevel))
  }

  function translateLevel(level: Level): AST.ListItem {
    const [heading, ...children] = level

    if (children.length === 0) {
      return listItem([
        translateHeading(heading)
      ])
    } else {
      return listItem([
        translateHeading(heading)
      , list(children.map(translateLevel))
      ])
    }
  }

  function translateHeading(heading: WrappedNode<AST.Heading>): AST.Paragraph {
    return paragraph([
      link(createLinkURL(heading), [
        text(createLinkText(heading))
      ])
    ])
  }
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
