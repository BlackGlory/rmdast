import * as MDAST from 'mdast'
import unified = require('unified')
import markdown = require('remark-parse')
import footnotes = require('remark-footnotes')
import { html } from './remark-html'

export function parse(
  text: string
, plugins: Array<Parameters<unified.Processor<unified.Settings>['use']>> = []
): MDAST.Root {
  let processor = unified()
    .use(markdown)

  // The plugins for rmdast should not create new ast node types.
  // They should convert new things to html, so rmdast can parse them as components.
  for (const plugin of plugins) {
    processor = processor.use(...plugin)
  }

  processor = processor
    .use(footnotes, { inlineNotes: true })
    .use(html)

  return processor.parse(text) as MDAST.Root
}
