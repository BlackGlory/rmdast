import * as MDAST from 'mdast'
import * as AST from '@src/ast'
import { preprocess } from './preprocess'
import { transformRoot } from './transform'
import { postprocess } from './postprocess'

export function transform(root: MDAST.Root): AST.Root {
  return postprocess(transformRoot(preprocess(root)))
}
