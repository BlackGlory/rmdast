import { Node, Definition } from '@src/mdast-utils/mdast-4.0'
import { visit } from 'unist-util-visit'

type IdentifierToDefinition = Map<string, Definition>

export function findDefinition(node: Node, identifier: string): Definition | null {
  const map = collectDefinitions(node)
  return map.get(normalizeIdentifier(identifier)) ?? null
}

function collectDefinitions(node: Node): IdentifierToDefinition {
  const map: IdentifierToDefinition = new Map()
  visit(node, 'definition', visitor)
  return map

  function visitor(definition: Definition) {
    map.set(normalizeIdentifier(definition.identifier), definition)
  }
}

function normalizeIdentifier(identifier: string): string {
  return identifier.toUpperCase()
}
