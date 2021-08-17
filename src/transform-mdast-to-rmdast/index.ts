import * as RMDAST from '@src/rmdast.js'
import * as MDAST from '@src/mdast-4.0.js'
import { postprocess } from './postprocess.js'
import { transformRoot } from './transform.js'

export function transform(root: MDAST.Root): RMDAST.Root {
  return postprocess(transformRoot(root))
}
