import * as RMDAST from '@src/rmdast-1.0'
import * as MDAST from '@src/mdast-3.0'
import { transform } from '@src/mdast-util-to-rmdast'
import { fromMarkdown } from 'mdast-util-from-markdown'

export function parse(text: string): RMDAST.Root {
  const mdast = fromMarkdown(text) as MDAST.Root
  const rmdast = transform(mdast)
  return rmdast
}
