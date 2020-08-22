import { tag } from './tag'
import { Eat, Tokenizer } from './types'
import { Node } from 'unist'

const LESS_THAN = '<'
// const GREATER_THAN = '>'
const SLASH = '/'
const EXCLAMATION = '!'

export const componentInlineTokenizer: Tokenizer = function (eat: Eat, value: string, silent: boolean = false): boolean | Node | void {
  const firstChar = value.charAt(0)
  // 如果第一个字符不是<, 则返回, 因为这不会是HTML标签的起点
  if (firstChar !== LESS_THAN) return

  const secondChar = value.charAt(1)
  if (isAlphabetical(secondChar) // HTML Tag Open
//|| secondChar === GREATER_THAN // JSX Fragment
  || secondChar === EXCLAMATION // HTML Comment
  || secondChar === SLASH // HTML Tag Close
  ) {
    const subvalueMatches = value.match(tag)
    if (subvalueMatches) {
      // 沉默模式, 该模式不消耗文本, 但返回测试结果
      if (silent) return true
      const subvalue = subvalueMatches[0]
      return eat(subvalue)({ type: 'component', value: subvalue })
    }
  }
}

function isAlphabetical(char: string): boolean {
  const code = char.charCodeAt(0)
  return (code >= 97 && code <= 122) // a-z
      || (code >= 65 && code <= 90) // A-Z
}

// 用于加速寻找下一个token
componentInlineTokenizer.locator = (value, fromIndex) => value.indexOf('<', fromIndex)
