import { Node } from 'unist'
import getDefinitions = require('mdast-util-definitions')

export function getDefinition(node: Node, identifier: string) {
  return getDefinitions(node)(identifier)
}
