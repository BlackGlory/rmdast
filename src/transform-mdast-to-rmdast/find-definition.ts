import * as MDAST from '@src/mdast-utils/mdast-4.0'
import { isDefinition } from '@src/mdast-utils/is'
import { find } from '@src/mdast-utils/find'

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
