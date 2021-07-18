import { Node } from '@src/mdast-3.0'
import { definitions } from 'mdast-util-definitions'

export function getDefinition(node: Node, identifier: string) {
  return definitions(node)(identifier)
}
