import * as RMDAST from './rmdast.js'
import * as MDAST from './mdast-4.0.js'
import { transform } from '@src/transform-mdast-to-rmdast/index.js'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { gfm } from 'micromark-extension-gfm'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown } from 'mdast-util-directive'
// 不可移除, 因为GFM风格的footnote不支持内联形式.
import { footnote } from 'micromark-extension-footnote'
import { footnoteFromMarkdown } from 'mdast-util-footnote'

export function parse(text: string): RMDAST.Root {
  const mdast = fromMarkdown(dosToUnix(text), 'utf-8', {
    extensions: [
      gfm()
    , footnote({ inlineNotes: true })
    , directive()
    ]
  , mdastExtensions: [
      gfmFromMarkdown()
    , footnoteFromMarkdown
    , directiveFromMarkdown
    ]
  }) as MDAST.Root
  const rmdast = transform(mdast)
  return rmdast
}

function dosToUnix(text: string): string {
  return text.replace(/\r\n/g, '\n')
}
