import * as MDAST from 'mdast'
import * as AST from '@src/ast'
import unified from 'unified'
import markdown from 'remark-parse'
import footnotes from 'remark-footnotes'
import { html } from '@src/remark-html'
import { transform } from '@src/mdast-util-to-rmdast'

export function parse(
  text: string
, plugins: Array<Parameters<unified.Processor<unified.Settings>['use']>> = []
): AST.Root {
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

  const mdast = processor.parse(text) as MDAST.Root
  const ast = transform(mdast)
  return ast
}
