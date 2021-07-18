import { Node, FootnoteDefinition } from '@src/mdast-3.0'
import { visit } from 'unist-util-visit'

type IdentifierToDefinition = Map<string, FootnoteDefinition>

export function getFootnoteDefinition(node: Node, identifier: string): FootnoteDefinition | null {
  const map = gather(node)
  const id = normalise(identifier)
  return map.get(id) ?? null
}

function gather(node: Node): IdentifierToDefinition {
  const map: IdentifierToDefinition = new Map()
  visit(node, 'footnoteDefinition', visitor)
  return map

  function visitor(footnoteDef: FootnoteDefinition) {
    map.set(normalise(footnoteDef.identifier), footnoteDef)
  }
}

function normalise(str: string): string {
  return str.toUpperCase()
}
