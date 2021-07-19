import { Node, FootnoteDefinition } from '@src/mdast-utils/mdast-4.0'
import { visit } from 'unist-util-visit'

type IdentifierToFootnoteDefinition = Map<string, FootnoteDefinition>

export function findFootnoteDefinition(
  node: Node
, identifier: string
): FootnoteDefinition | null {
  const map = collectFootnoteDefinitions(node)
  return map.get(normalizeIdentifier(identifier)) ?? null
}

function collectFootnoteDefinitions(node: Node): IdentifierToFootnoteDefinition {
  const map: IdentifierToFootnoteDefinition = new Map()
  visit(node, 'footnoteDefinition', visitor)
  return map

  function visitor(footnoteDefinition: FootnoteDefinition) {
    map.set(normalizeIdentifier(footnoteDefinition.identifier), footnoteDefinition)
  }
}

function normalizeIdentifier(identifier: string): string {
  return identifier.toUpperCase()
}
