import { dedent } from 'extra-tags'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { gfm } from 'micromark-extension-gfm'
import { footnote } from 'micromark-extension-footnote'
import { footnoteFromMarkdown } from 'mdast-util-footnote'
import { directive } from 'micromark-extension-directive'
import { directiveFromMarkdown } from 'mdast-util-directive'

test('Break', () => {
  const markdown = dedent`
  Duis aute irure dolor in reprehenderit in voluptate 
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = parse(markdown)

  expect(result).toMatchObject({
    type: 'root'
  , children: [
      {
        type: 'paragraph'
      , children: [
          {
            type: 'text'
          , value: 'Duis aute irure dolor in reprehenderit in voluptate'
          }
        , { type: 'break' }
        , {
            type: 'text'
          , value: 'velit esse cillum dolore eu fugiat nulla pariatur.'
          }
        ]
      }
    ]
  })
})

test('Newline', () => {
  const markdown = dedent`
  Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur.
  `

  const result = parse(markdown)

  expect(result).toMatchObject({
    type: 'root'
  , children: [
      {
        type: 'paragraph'
      , children: [
          {
            type: 'text'
          , value: 'Duis aute irure dolor in reprehenderit in voluptate\nvelit esse cillum dolore eu fugiat nulla pariatur.'
          }
        ]
      }
    ]
  })
})

function parse(text: string) {
  return fromMarkdown(text, {
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
  })
}
