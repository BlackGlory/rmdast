import * as MDAST from 'mdast'
import * as AST from '@src/ast'
import { transformRoot } from './transform'

export function transform(root: MDAST.Root): AST.Root {
  return transformRoot(root)
}
