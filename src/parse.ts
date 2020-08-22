import * as MDAST from 'mdast'
import unified = require('unified')
import markdown = require('remark-parse')
import footnotes = require('remark-footnotes')
import { remarkWebComponents } from './remark-web-components'

export function parse(text: string): MDAST.Root {
  const node = unified()
    .use(markdown)
    .use(footnotes, { inlineNotes: true })
    .use(remarkWebComponents)
    .parse(text) as MDAST.Root
  return node
}
