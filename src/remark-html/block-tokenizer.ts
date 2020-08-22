import { Eat, Tokenizer } from './types'
import { Node } from 'unist'
import { tokenize, Tokenizer as HTMLTokenizer } from 'hyntax'
import {
  getBeforeFirstStartTagTokens
, getFirstStartTagToItsCloseTokens
} from './shared'

export const blockTokenizer: Tokenizer = function (eat: Eat, text: string, silent: boolean): boolean | Node | void {
  const { tokens } = tokenize(text)

  const beforeFirstStartTagTokens = getBeforeFirstStartTagTokens(tokens)
  const beforeFirstStartTagString = concatTokenContents(beforeFirstStartTagTokens)

  // 在第一个打开标签之前存在换行符, 说明首行不是HTML代码段的开始
  if (beforeFirstStartTagString.includes('\n')) return

  // 在第一个打开标签之前存在非空白字符, 说明这是一个pargraph, 应该转入inlineTokenizer.
  if (/\S/.test(beforeFirstStartTagString)) return

  const blockTokens = getFirstStartTagToItsCloseTokens(tokens)
  if (blockTokens.length > 0) {
    if (silent) return true

    const lastToken = blockTokens[blockTokens.length - 1]
    // 吞掉结束处一整行
    const newlineIndexAfterLastTokenEnd = text.indexOf('\n', lastToken.endPosition)
    const endPosition = newlineIndexAfterLastTokenEnd !== -1 ? newlineIndexAfterLastTokenEnd + 1 : text.length
    const subText = text.slice(0, endPosition)
    return eat(subText)({ type: 'html', value: subText })
  }
}

function concatTokenContents(tokens: HTMLTokenizer.AnyToken[]): string {
  return tokens.map(x => x.content).join('')
}
