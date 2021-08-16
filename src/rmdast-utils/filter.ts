import { flatMap } from './flat-map.js'
import * as RMDAST from '@src/rmdast-2.0.js'

export function filter(
  node: RMDAST.Node
, predicate: (node: RMDAST.Node) => unknown
): RMDAST.Node | undefined {
  const results = flatMap(node, node => {
    if (predicate(node)) {
      return [node]
    } else {
      return []
    }
  })

  if (results.length === 1) return results[0]
  return undefined
}
