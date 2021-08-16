import * as MDAST from '@src/mdast-4.0.js'
import * as RMDAST from '@src/rmdast-2.0.js'
import { transformRoot } from './transform.js'

export function transform(root: MDAST.Root): RMDAST.Root {
  return transformRoot(root)
}
