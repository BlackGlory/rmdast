import { Node, Parent, Position } from 'unist'

export interface Add {
  (node: Node, parent?: Parent): Node
  test(): Position
  reset(node: Node, parent?: Node): Node
}

export type Eat = (value: string) => Add

export type Locator = (value: string, fromIndex: number) => number

export interface Tokenizer {
  (eat: Eat, value: string, silent: true): boolean | Node | void
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
