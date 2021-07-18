import * as MDAST from '@src/mdast-3.0'
import * as RMDAST from '@src/rmdast-1.0'
import { transformRoot } from './transform'

export function transform(root: MDAST.Root): RMDAST.Root {
  return transformRoot(root)
}
