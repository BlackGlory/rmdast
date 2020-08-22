import { Tokenizer as HTMLTokenizer } from 'hyntax'

export function getBeforeFirstStartTagTokens(tokens: HTMLTokenizer.AnyToken[]): HTMLTokenizer.AnyToken[] {
  const startTagTokenIndex = tokens.findIndex(isTagOpen)
  if (startTagTokenIndex !== -1) return tokens.slice(0, startTagTokenIndex)
  return []
}

export function getFirstStartTagToItsCloseTokens(tokens: HTMLTokenizer.AnyToken[]): HTMLTokenizer.AnyToken[] {
  const startTagTokenIndex = tokens.findIndex(isTagOpen)
  if (startTagTokenIndex !== -1) {
    let openTagCount = 0
    for (let i = startTagTokenIndex; i < tokens.length; i++) {
      const token = tokens[i]
      if (isTagOpen(token)) openTagCount++
      if (isTagClose(token)) {
        openTagCount--
        // 关闭此标签后, 打开的标签数量为零, 代表这是一段HTML代码块的结束
        if (openTagCount === 0) return tokens.slice(startTagTokenIndex, i + 1)
      }
    }
  }
  return []
}

function isTagOpen(token: HTMLTokenizer.AnyToken): boolean {
  return token.type === 'token:open-tag-start'
}

function isTagClose(token: HTMLTokenizer.AnyToken): boolean {
  return token.type === 'token:close-tag'
}
