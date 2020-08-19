import { Node } from 'unist'
import { FootnoteDefinition } from 'mdast'
import visit = require('unist-util-visit')

type IdToDef = Map<string, FootnoteDefinition>

export function getFootnoteDefinition(node: Node, identifier: string): FootnoteDefinition | null {
  const map = gather(node)
  const id = normalise(identifier)
  return map.get(id) ?? null
}

function gather(node: Node): IdToDef {
  const map: IdToDef = new Map()
  visit(node, 'footnoteDefinition', visitor)
  return map

  function visitor(footnoteDef: FootnoteDefinition) {
    map.set(normalise(footnoteDef.identifier), footnoteDef)
  }
}

function normalise(str: string): string {
  return str.toUpperCase()
}
