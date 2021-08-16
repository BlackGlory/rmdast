import * as RMDAST from './rmdast-2.0.js'
import * as MDAST from './mdast-4.0.js'
import { transform } from '@src/transform-mdast-to-rmdast/index.js'
import {
  concatContinuousText
, removeEmptyParagraph
, transformImageOnlyListToGallery
, transofrmInlineImageToImage
} from '@src/rmdast-utils/postprocess.js'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { gfm } from 'micromark-extension-gfm'
import { footnote } from 'micromark-extension-footnote'
import { footnoteFromMarkdown } from 'mdast-util-footnote'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown } from 'mdast-util-directive'

export function parse(text: string): RMDAST.Root {
  const mdast = fromMarkdown(text, {
    extensions: [
      gfm()
    , footnote({ inlineNotes: true })
    , directive()
    ]
  , mdastExtensions: [
      gfmFromMarkdown
    , footnoteFromMarkdown
    , directiveFromMarkdown
    ]
  }) as MDAST.Root
  const rmdast = postprocess(transform(mdast))
  return rmdast
}

function postprocess(root: RMDAST.Root): RMDAST.Root {
  return (
    transformImageOnlyListToGallery(
      transofrmInlineImageToImage(
        removeEmptyParagraph(
          concatContinuousText(root)
        )
      )
    )
  )
}
