import { Eat, Tokenizer } from './types'
import { Node } from 'unist'
import { tokenize } from 'hyntax'
import {
  getBeforeFirstStartTagTokens
, getFirstStartTagToItsCloseTokens
} from './shared'

export const componentInlineTokenizer: Tokenizer = function (eat: Eat, text: string, silent: boolean): boolean | Node | void {
  const { tokens } = tokenize(text)

  // 在第一个打开标签之前存在其他内容, 说明不是HTML代码段的开始
  if (getBeforeFirstStartTagTokens(tokens).length > 0) return

  const blockTokens = getFirstStartTagToItsCloseTokens(tokens)
  if (blockTokens.length > 0) {
    if (silent) return true

    const lastToken = blockTokens[blockTokens.length - 1]
    const subText = text.slice(0, lastToken.endPosition + 1)
    return eat(subText)({ type: 'inline-component', value: subText })
  }
}

// 用于加速寻找下一个token
componentInlineTokenizer.locator = (value, fromIndex) => value.indexOf('<', fromIndex)
