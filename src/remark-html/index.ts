import { Plugin } from 'unified'
import { Parser } from './types'
import { blockTokenizer } from './block-tokenizer'
import { inlineTokenizer } from './inline-tokenizer'

export const html: Plugin = function () {
  attachParser(this.Parser)
}

function attachParser(parser: Parser) {
  const { blockTokenizers, inlineTokenizers } = parser.prototype

  blockTokenizers.html = blockTokenizer
  inlineTokenizers.html = inlineTokenizer
}
