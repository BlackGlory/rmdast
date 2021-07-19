import * as MDAST from '@src/mdast-utils/mdast-4.0'
import * as RMDAST from '@src/rmdast-utils/rmdast-2.0'
import { transformRoot } from './transform'

export function transform(root: MDAST.Root): RMDAST.Root {
  return transformRoot(root)
}
