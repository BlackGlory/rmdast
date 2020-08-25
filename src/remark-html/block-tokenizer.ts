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

  // 在第一个打开标签之前存在非空白字符, 说明这是一个paragraph, 应该转入inlineTokenizer.
  if (/\S/.test(beforeFirstStartTagString)) return

  const blockTokens = getFirstStartTagToItsCloseTokens(tokens)
  if (blockTokens.length > 0) {
    const lastToken = blockTokens[blockTokens.length - 1]
    const newlineIndexAfterLastTokenEnd = text.indexOf('\n', lastToken.endPosition)
    const endPosition = newlineIndexAfterLastTokenEnd !== -1 ? newlineIndexAfterLastTokenEnd : text.length

    // 在闭合标签到下一个换行之前, 存在非空白字符, 说明这是一个paragraph, 应该转入inlineTokenizer.
    if (/\S/.test(text.slice(lastToken.endPosition, newlineIndexAfterLastTokenEnd))) return

    if (silent) return true

    const subText = text.slice(0, endPosition)
    const add = eat(subText)
    const node = add({ type: 'html', value: subText })
    return node
  }
}

function concatTokenContents(tokens: HTMLTokenizer.AnyToken[]): string {
  return tokens.map(x => x.content).join('')
}
