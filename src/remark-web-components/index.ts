import { Plugin } from 'unified'
import { Parser } from './types'
import { componentBlockTokenizer } from './component-block-tokenizer'
import { componentInlineTokenizer } from './component-inline-tokenizer'

export const remarkWebComponents: Plugin = function () {
  attachParser(this.Parser)
}

function attachParser(parser: Parser) {
  const { blockTokenizers, inlineTokenizers } = parser.prototype

  blockTokenizers.html = componentBlockTokenizer
  inlineTokenizers.html = componentInlineTokenizer
}
