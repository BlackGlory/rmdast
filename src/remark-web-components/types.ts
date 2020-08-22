import { Node, Parent, Position } from 'unist'

export interface Add {
  (node: Node, parent?: Parent): Node
  test(): Position
  reset(node: Node, parent?: Node): Node
}

export type Eat = (value: string) => Add

export type Locator = (value: string, fromIndex: number) => number

export type Tokenizer = TokenizerNotCareSilent | TokenizerCareSilent

export interface TokenizerNotCareSilent {
  (eat: Eat, value: string): Node | void
  locator?: Locator
  onlyAtStart?: boolean
  notInBlock?: boolean
  notInList?: boolean
  notInLink?: boolean
}

export interface TokenizerCareSilent {
  (eat: Eat, value: string, silent: true): boolean | void | Node
  locator?: Locator
  onlyAtStart?: boolean
  notInBlock?: boolean
  notInList?: boolean
  notInLink?: boolean
}

export interface Parser {
  prototype: {
    blockTokenizers: { [index: string]: Tokenizer }
    inlineTokenizers: { [index: string]: Tokenizer }
    blockMethods: string[]
    inlineMethods: string[]
  }
}
