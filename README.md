# rmdast

**R**enderable **M**ark**d**own **A**bstract **S**yntax **T**ree.

An easy to render version of [mdast](https://github.com/syntax-tree/mdast).

The new AST is designed to render nodes directly from mdast to any platform,
e.g. React.

## Pros and Cons

Pros
- Supports extending MDAST with Web Components syntax, thus avoiding direct extensions at the AST level.
- By manually rendering AST, you have full control over the rendering of AST.

Cons
- Due to the source-to-source compilation of MDAST, it can only support the original MDAST specification.
- Since you need to render the AST yourself, some additional coding is required.

## How does it work?

1. Parse: Text => MDAST
2. Transpile: MDAST => RMDAST
3. Transpile(manually): RMDAST => JSX/HTML/Terminal...

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
