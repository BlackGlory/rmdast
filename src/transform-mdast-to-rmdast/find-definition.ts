import * as MDAST from '@src/mdast-4.0.js'
import { isDefinition } from '@mdast-utils/is.js'
import { find } from '@mdast-utils/find.js'

export function findDefinition(node: MDAST.Node, identifier: string): MDAST.Definition | null {
  const normalizedIdentifier = normalizeIdentifier(identifier)
  return find<MDAST.Definition>(node, node => {
    return isDefinition(node)
        && normalizeIdentifier(node.identifier) === normalizedIdentifier
  }) ?? null
}

function normalizeIdentifier(identifier: string): string {
  return identifier.toLowerCase()
}
