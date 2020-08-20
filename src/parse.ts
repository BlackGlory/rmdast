import * as MDAST from 'mdast'
import * as AST from './ast'
import unified = require('unified')
import markdown = require('remark-parse')
import footnotes = require('remark-footnotes')
import { transform } from './transform'

export function parse(text: string): AST.Root {
  const node = unified()
    .use(markdown)
    .use(footnotes, { inlineNotes: true })
    .parse(text) as MDAST.Root
  return transform(node)
}
