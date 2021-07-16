import { Extension } from 'micromark-util-types'
import { codes } from 'micromark-util-symbol/codes'
import { componentFlow } from './component-flow'
import { componentText } from './component-text'

export function component(): Extension {
  return {
    // Flow在micromark里代表具有明确"开始"和"结束"的块级内容, 包含HTML.
    flow: {
      // 指定`<`作为该解析器的入口
      [codes.lessThan]: componentFlow()
    },

    // Text在micromark里代表内联的内容, 包含HTML.
    text: {
      // 指定`<`作为该解析器的入口
      [codes.lessThan]: componentText()
    }
  }
}
