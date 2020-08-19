import { Root } from 'mdast'
import unified = require('unified')
import markdown = require('remark-parse')

export function parse(text: string): Root {
  const node = unified()
    .use(markdown)
    .parse(text) as Root
  return node
}
