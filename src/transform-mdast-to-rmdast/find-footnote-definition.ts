import * as MDAST from '@src/mdast-4.0.js'
import { isFootnoteDefinition } from '@mdast-utils/is.js'
import { find } from '@mdast-utils/find.js'

export function findFootnoteDefinition(
  node: MDAST.Node
, identifier: string
): MDAST.FootnoteDefinition | null {
  const normalizedIdentifier = normalizeIdentifier(identifier)
  return find<MDAST.FootnoteDefinition>(node, node => {
    return isFootnoteDefinition(node)
        && normalizeIdentifier(node.identifier) === normalizedIdentifier
  }) ?? null
}

function normalizeIdentifier(identifier: string): string {
  return identifier.toLowerCase()
}
