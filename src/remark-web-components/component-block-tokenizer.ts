import { Node } from 'unist'
import { openCloseTag } from './tag'
import { Eat, Tokenizer } from './types'

const TAB = '\t'
const SPACE = ' '
const LINE_FEED = '\n'
const LESS_THAN = '<'

const rawOpenExpression = /^<(script|pre|style)(?=(\s|>|$))/i
const rawCloseExpression = /<\/(script|pre|style)>/i

const commentOpenExpression = /^<!--/
const commentCloseExpression = /-->/

/*
const directiveOpenExpression = /^<![A-Za-z]/
const directiveCloseExpression = />/
*/

/*
const cdataOpenExpression = /^<!\[CDATA\[/
const cdataCloseExpression = /\]\]>/
*/

const blocks = /[a-z\.]*(\.){0,1}[a-z][a-z0-9\.]*/
const elementOpenExpression = new RegExp('^</?(' + blocks.source + ')(?=(\\s|/?>|$))', 'i')
const elementCloseExpression = /^$/

const otherElementOpenExpression = new RegExp(openCloseTag.source + '\\s*$')
const otherElementCloseExpression = elementCloseExpression

enum SEQ {
  OPEN = 0
, CLOSE = 1
, SILENT_RESULT = 2
}
const sequences: Array<[open: RegExp, close: RegExp, silentResult: boolean]> = [
  [rawOpenExpression, rawCloseExpression, true]
, [commentOpenExpression, commentCloseExpression, true]
//, [directiveOpenExpression, directiveCloseExpression, true]
//, [cdataOpenExpression, cdataCloseExpression, true]
, [elementOpenExpression, elementCloseExpression, true]
, [otherElementOpenExpression, otherElementCloseExpression, false]
]

export const componentBlockTokenizer: Tokenizer = (eat: Eat, value: string, silent: boolean = false): boolean | void | Node => {
  let index = 0
  // 将index从起始位置移至第一个非空白字符
  while (index < value.length) {
    const char = value.charAt(index)
    if (char === TAB || char === SPACE) index++
    else break
  }

  // 如果第一个实际意义上的字符不是<, 则返回, 因为这不会是HTML标签的起点
  if (value.charAt(index) !== LESS_THAN) return

  // 从第二个字符开始寻找换行符
  // 如果找到换行符, 则将next改为换行符的索引值(也可称为下一段文本的起点位置)
  let next = value.indexOf(LINE_FEED, index + 1)
  // 如果未找到换行符, 则将next改为字符串的终点
  if (next === -1) next = value.length

  // 提取换行符前的文本
  let line = value.slice(index, next)

  // 找到一个能匹配的打开标签
  let sequence: [RegExp, RegExp, boolean] | undefined
  for (const seq of sequences) {
    if (seq[SEQ.OPEN].test(line)) {
      sequence = seq
      break
    }
  }
  // 如果没找到正则表达式, 则无法解析
  if (!sequence) return

  // 沉默模式, 该模式不消耗文本, 但返回测试结果
  if (silent) return sequence[SEQ.SILENT_RESULT]

  // 将index移至下一段文本的换行符处
  index = next

  // 测试能否找到闭合标签
  if (!sequence[SEQ.CLOSE].test(line)) {
    // 如果不能, 则移至下一个换行符处重试
    while (index < value.length) {
      // 寻找换行符, 与上方第一次寻找换行符的代码一致
      // 如果找到换行符, 则将next改为换行符的索引值(也可称为下一段文本的起点位置)
      next = value.indexOf(LINE_FEED, index + 1)
      // 如果未找到换行符, 则将next改为字符串的终点
      if (next === -1) next = value.length

      // 提取换行符前的文本, index + 1是为了跳掉上一个换行符
      line = value.slice(index + 1, next)

      // 测试能否找到闭合标签
      if (sequence[SEQ.CLOSE].test(line)) {
        // 找到闭合标签的情况下
        // 如果文本行非空, 将index移至下一个换行符处(这使得在HTML闭合标签后至下一个换行符之前的内容也会被吃掉)
        if (line) index = next
        // 如果文本行是空的, 为什么能匹配? 我认为这是不必要的条件语句
        break
      } else {
        // 未找到闭合标签的情况下, index移至下一个换行符处进入下一轮循环
        index = next
      }
    }
    // 如果找不到能匹配的闭合标签, 则index的位置最终会是整个字符串的末尾, 这意味着从打开标签到文本末尾的所有字符都会被吃掉.
  }

  // 提取将被吃掉的部分
  const subvalue = value.slice(0, index)

  return eat(subvalue)({ type: 'component', value: subvalue })
}
