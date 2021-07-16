import { Construct, State, Code } from 'micromark-util-types'
import assert from 'assert'
import {
  asciiAlpha as isAsciiAlpha
, asciiAlphanumeric as isAsciiAlphanumeric
, markdownLineEndingOrSpace as isMarkdownLineEndingOrSpace
, markdownSpace as isMarkdownSpace
} from 'micromark-util-character'
import { types } from 'micromark-util-symbol/types'
import { CodeDict } from './code-dict'

export function componentFlow(): Construct {
  return {
    name: 'htmlFlow'
  , concrete: true

  , tokenize(effects, ok, nok) {
      return start

      function start(code: Code): State {
        assert(code === CodeDict['<'], 'expected `<`')

        effects.enter(types.htmlFlow)
        effects.enter(types.htmlFlowData)

        // 消耗掉`<`
        effects.consume(code)

        return routeByTagType

        function routeByTagType(code: Code) {
          if (code === CodeDict['!']) return comment(code)
          if (isAsciiAlpha(code)) return tagOpen(code)
          return nok(code)
        }
      }

      function comment(code: Code) {
        // 进入此函数时, `<`已经被消耗掉.
        return commentStart(code)

        function commentStart(code: Code) {
          if (code === CodeDict['!']) {
            effects.consume(code)

            // 需要连续满足 `<!--` 才能将判定为 HTML comment
            return function (code: Code) {
              if (code === CodeDict['-']) {
                effects.consume(code)

                return function (code: Code) {
                  if (code === CodeDict['-']) {
                    effects.consume(code)
                    return commentContent
                  }

                  return nok(code)
                }
              }

              return nok(code)
            }
          }

          return nok(code)
        }

        function commentContent(code: Code) {
          if (code === CodeDict.EOF) return nok(code)
          if (code === CodeDict['-']) return commentClose(code)

          effects.consume(code)
          return commentContent
        }

        function commentClose(code: Code): State | void {
          if (code === CodeDict['-']) {
            effects.consume(code)

            return function commentCloseAfterFirstCharacter(code: Code) {
              if (code === CodeDict['-']) {
                effects.consume(code)
                return end
              }

              return nok(code)
            }
          }

          return nok(code)
        }
      }

      function tagOpen(code: Code) {
        // 进入此函数时, `<`已经被消耗掉.
        return tagOpenName(code)

        function tagOpenName(code: Code) {
          // tag名必须由字母开始
          if (isAsciiAlpha(code)) {
            effects.consume(code)

            return function tagOpenNameAfterFirstCharacter(code: Code) {
              // tag名称
              if (code === CodeDict['-'] || isAsciiAlphanumeric(code)) {
                effects.consume(code)
                return tagOpenNameAfterFirstCharacter
              }

              // tag可能带有属性
              if (isMarkdownLineEndingOrSpace(code)) {
                return tagOpenContent(code)
              }

              // tag是一个自关闭tag
              if (code === CodeDict['/']) {
                effects.consume(code)
                return end
              }

              // tagOpen结束, 转入tagContent
              if (code === CodeDict['>']) {
                effects.consume(code)
                return tagContent
              }

              return nok(code)
            }
          }

          return nok(code)
        }

        function tagOpenContent(code: Code) {
          // tag是一个自关闭tag
          if (code === CodeDict['/']) {
            effects.consume(code)
            return end
          }

          if (isMarkdownSpace(code)) {
            effects.consume(code)
            return tagOpenContent
          }

          if (isAsciiAlpha(code)) {
            return tagOpenAttribute(code)
          }

          if (code === CodeDict['>']) {
            return tagOpenEnd(code)
          }

          return nok(code)

          function tagOpenAttribute(code: Code) {
            if (isAsciiAlpha(code)) {
              return tagOpenAttributeName(code)
            }

            return nok(code)

            function tagOpenAttributeName(code: Code) {
              // 属性名应该以字母开头
              if (isAsciiAlpha(code)) {
                effects.consume(code)

                return function tagOpenAttributeNameAfterFirstCharacter(code: Code) {
                  if (code === CodeDict['-']
                  ||  code === CodeDict['.']
                  ||  code === CodeDict['_']
                  // `:`是XML属性特有的, 例如`xml:lang`
                  ||  code === CodeDict[':']
                  ||  isAsciiAlphanumeric(code)) {
                    effects.consume(code)
                    return tagOpenAttributeNameAfterFirstCharacter
                  }

                  return function tagOpenAttributeNameAfter(code: Code): State | void {
                    if (isMarkdownSpace(code)) {
                      effects.consume(code)
                      return tagOpenAttributeNameAfter
                    }

                    if (code === CodeDict['=']) {
                      effects.consume(code)
                      return tagOpenAttributeValue
                    }

                    return tagOpenContent(code)
                  }
                }
              }
            }

            function tagOpenAttributeValue(code: Code) {
              if (code === CodeDict['"']
              ||  code === CodeDict["'"]) {
                effects.consume(code)
                const quotationMark: NonNullable<Code> = code
                return function tagOpenAttributeValueQuoted(code: Code) {
                  if (code === quotationMark) {
                    effects.consume(code)
                    return tagOpenContent
                  }

                  effects.consume(code)
                  return tagOpenAttributeValueQuoted
                }
              }

              // 如果运行到此处, 说明attribute的值是无引号的或其他字符, 我不打算支持无引号的值
              return nok(code)
            }
          }
        }

        function tagOpenEnd(code: Code): State | void {
          if (code === CodeDict['>']) {
            effects.consume(code)
            return tagContent
          }

          return nok(code)
        }
      }

      function tagContent(code: Code) {
        if (code === CodeDict['<']) {
          effects.consume(code)

          return function (code: Code) {
            if (code === CodeDict['/']) {
              effects.consume(code)
              return tagClose
            }

            return nok(code)
          }
        }

        effects.consume(code)
        return tagContent
      }

      function tagClose(code: Code) {
        // 进入此函数时, `</`已经被消耗掉
        return tagCloseName(code)

        function tagCloseName(code: Code) {
          // 标签名必须以字母开始
          if (isAsciiAlpha(code)) {
            effects.consume(code)

            return function tagCloseNameAfterFirstCharacter(code: Code) {
              if (code === CodeDict['-'] || isAsciiAlphanumeric(code)) {
                effects.consume(code)
                return tagCloseNameAfterFirstCharacter
              }

              return tagCloseContent(code)
            }
          }

          return nok(code)
        }

        function tagCloseContent(code: Code) {
          if (isMarkdownSpace(code)) {
            effects.consume(code)
            return tagCloseContent
          }

          return end(code)
        }
      }

      function end(code: Code) {
        if (code === CodeDict['>']) {
          effects.consume(code)
          effects.exit(types.htmlFlowData)
          effects.exit(types.htmlFlow)

          return ok
        }

        return nok(code)
      }
    }
  }
}
