# rmdast

**R**enderable **M**ark**d**own **A**bstract **S**yntax **T**ree.

An easy to render version of [mdast](https://github.com/syntax-tree/mdast).

The new AST is designed to render nodes directly from mdast to any platform,
e.g. React.

## Difference from mdast

`ImageReference` are converted to `Image`.

`LinkReference` are converted to `Link`.

`FootnoteReference` are converted to `Footnote`.

The type of `Footnote.children` is changed to `Array<PhrasingContent | BlockContent>`.

The type of `Literal.value` is changed to `string`.

The following node types are removed:
- `YAML`
- `Definition`
- `FootnoteDefinition`

The following node properties are removed:
- `data`
- `position`
