import * as AST from '@src/rmdast.js'
import { isHeading } from './is.js'
import { findAll } from './find-all.js'
import { addHelpersInPlace, NodeWithHelpers } from './add-helpers.js'

export type TableOfContents = Heading[]

export interface Heading {
  text: string
  url: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: Heading[]  
}

export function createTableOfContents(
  root: AST.Root
, { createHeadingText, createHeadingURL }: {
    createHeadingText: (heading: NodeWithHelpers<AST.Heading>) => string
  , createHeadingURL: (heading: NodeWithHelpers<AST.Heading>) => string
  }
): TableOfContents {
  type InternalTableOfContents = InternalHeading[]
  type InternalHeading = [
    heading: NodeWithHelpers<AST.Heading>
  , ...children: InternalHeading[]
  ]

  const ast = addHelpersInPlace(root)

  const tableOfContents: InternalTableOfContents = []
  const stack: InternalHeading[] = []
  for (const headingNode of findAll<NodeWithHelpers<AST.Heading>>(ast, isHeading)) {
    const heading: InternalHeading = [headingNode]

    while (true) {
      if (stack.length === 0) {
        tableOfContents.push(heading)
        break
      } else {
        if (headingNode.depth > last(stack)[0].depth) {
          last(stack).push(heading)
          break
        } else {
          stack.pop()
        }
      }
    }

    stack.push(heading)
  }

  return internalTableOfContentsToTableOfContents(tableOfContents)

  function internalTableOfContentsToTableOfContents(
    toc: InternalTableOfContents
  ): TableOfContents {
    return toc.map(x => internalHeadingToHeading(x, 1))
  }

  function internalHeadingToHeading(
    [heading, ...children]: InternalHeading
  , level: 1 | 2 | 3 | 4 | 5 | 6
  ): Heading {
    return {
      text: createHeadingText(heading)
    , url: createHeadingURL(heading)
    , level
    , children: children.map(x => internalHeadingToHeading(
        x
      , level + 1 as Heading['level']
      ))
    }
  }
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
