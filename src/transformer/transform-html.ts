import { tokenize, constructTree, TreeConstructor } from 'hyntax'
import * as MDAST from 'mdast'
import * as AST from '@src/ast'

export class UnknownHTMLError extends Error {
  name = this.constructor.name
}

export function transformHTML(node: MDAST.HTML, root: MDAST.Root): AST.Component | AST.Comment {
  const { tokens } = tokenize(node.value)
  const { ast } = constructTree(tokens)
  const htmlNode = ast.content.children[0]

  if (isComment(htmlNode)) return transformCommentNode(htmlNode)
  if (isTag(htmlNode)) return transformTagNode(htmlNode, node.value)
  throw new UnknownHTMLError()
}

function transformTagNode(node: TreeConstructor.TagNode, text: string): AST.Component {
  const [start, end] = getInnerRange(node)
  const value = text.slice(start, end)

  return {
    type: 'component'
  , name: node.content.name
  , attrs: transformAttributes(node.content.attributes ?? [])
  , children: node.content.children?.map(x => {
      if (isComment(x)) return transformCommentNode(x)
      if (isText(x)) return transformTextNode(x)
      if (isTag(x)) return transformTagNode(x, text)
      throw new UnknownHTMLError()
    }) ?? []
  , value
  }

  function getInnerRange(node: TreeConstructor.TagNode): [start: number, end: number] {
    if (isSelfClosing(node)) {
      // A Self-Closing node in hyntax does not have 'close'
      // See also https://github.com/mykolaharmash/hyntax/issues/31
      //          https://github.com/mykolaharmash/hyntax/issues/32
      const start = node.content.openEnd.endPosition + 1
      const end = text.length
      return [start, end]
    } else {
      const start = node.content.openEnd.endPosition + 1
      const end = node.content.close.startPosition
      return [start, end]
    }

    function isSelfClosing(node: TreeConstructor.TagNode): boolean {
      return !node.content.close
    }
  }

  function transformAttributes(attributes: TreeConstructor.TagAttribute[]): { [index: string]: string } {
    const result: { [index: string]: string } = {}
    for (const attr of attributes) {
      if (attr.key) {
        if (attr.value) {
          result[attr.key.content] = attr.value.content
        } else {
          result[attr.key.content] = ''
        }
      }
    }
    return result
  }
}

function transformCommentNode(node: TreeConstructor.CommentNode): AST.Comment {
  return {
    type: 'comment'
  , value: node.content.value.content
  }
}

function transformTextNode(node: TreeConstructor.TextNode): AST.Text {
  return {
    type: 'text'
  , value: node.content.value.content
  }
}

function isComment(node: TreeConstructor.AnyNode): node is TreeConstructor.CommentNode {
  return node.nodeType === 'comment'
}

function isText(node: TreeConstructor.AnyNode): node is TreeConstructor.TextNode {
  return node.nodeType === 'text'
}

function isTag(node: TreeConstructor.AnyNode): node is TreeConstructor.TagNode {
  return node.nodeType === 'tag'
}