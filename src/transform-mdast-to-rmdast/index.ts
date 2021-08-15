import * as MDAST from '@src/mdast-utils/mdast-4.0.js'
import * as RMDAST from '@src/rmdast-utils/rmdast-2.0.js'
import { transformRoot } from './transform.js'

export function transform(root: MDAST.Root): RMDAST.Root {
  return transformRoot(root)
}
