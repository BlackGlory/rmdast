import * as MDAST from 'mdast'
import unified = require('unified')
import markdown = require('remark-parse')
import footnotes = require('remark-footnotes')
import { html } from './remark-html'

export function parse(text: string): MDAST.Root {
  const node = unified()
    .use(markdown)
    .use(footnotes, { inlineNotes: true })
    .use(html)
    .parse(text) as MDAST.Root
  return node
}
