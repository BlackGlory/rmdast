# rmdast

**R**enderable **M**ark**d**own **A**bstract **S**yntax **T**ree.

rmdast v2 is an easy-to-render version of [mdast v4],
the new AST is designed to render nodes directly from AST to any platform, e.g. React.
So you can precisely control the translation results through recursive descent analysis.

[mdast v4]: https://github.com/syntax-tree/mdast/tree/4.0.0

## Install

```sh
npm install --save rmdast
# or
yarn add rmdast
```

## Usage

```ts
import { parse } from 'rmdast'
import { dedent } from 'extra-tags'

const markdown = dedent`
  # Gallery

  - ![](a)
  - ![](b)
  - ![](c)
`

const rmdast = parse(markdown)
// {
//   "type": "root",
//   "children": [
//     {
//       "type": "heading",
//       "depth": 1,
//       "children": [
//         {
//           "type": "text",
//           "value": "Gallery"
//         }
//       ]
//     },
//     {
//       "type": "gallery",
//       "children": [
//         {
//           "type": "image",
//           "url": "a",
//           "title": null,
//           "alt": ""
//         },
//         {
//           "type": "image",
//           "url": "b",
//           "title": null,
//           "alt": ""
//         },
//         {
//           "type": "image",
//           "url": "c",
//           "title": null,
//           "alt": ""
//         }
//       ]
//     }
//   ]
// }
```

### AST

```ts
interface Node {
  type: string
}

interface Parent {
  children: Node[]
}

interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

type BlockNode =
| Root
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| ListItem
| Code
| Image
| Table
| TableRow
| TableCell
| LeafDirective
| ContainerDirective
| Gallery

type InlineNode =
| Text
| Emphasis
| Strong
| InlineCode
| Break
| Link
| InlineImage
| Delete
| Footnote
| InlineFootnote
| TextDirective

type RootContent =
| UniversalBlockContent
| Gallery

type UniversalBlockContent =
| Paragraph
| Heading
| ThematicBreak
| Blockquote
| List
| Code
| Image
| Table
| LeafDirective
| ContainerDirective

type UniversalInlineContent =
| Text
| Emphasis
| Strong
| InlineCode
| Break
| Link
| InlineImage
| Delete
| Footnote
| InlineFootnote
| TextDirective

interface Root extends Node, ParentOf<RootContent[]> {
  type: 'root'
}

interface Paragraph extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'paragraph'
}

interface Heading extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'heading'
  depth: 1 | 2 | 3 | 4 | 5 | 6
}

interface ThematicBreak extends Node {
  type: 'thematicBreak'
}

interface Blockquote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'blockquote'
}

interface List extends Node, ParentOf<ListItem[]> {
  type: 'list'
  ordered: boolean | null
  start: number | null
  spread: boolean | null
}

interface ListItem extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'listItem'
  spread: boolean | null
  checked: boolean | null
}

interface Code extends Node {
  type: 'code'
  value: string
  lang: string | null
  meta: string | null
}

interface Text extends Node {
  type: 'text'
  value: string
}

interface Emphasis extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'emphasis'
}

interface Strong extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'strong'
}

interface InlineCode extends Node {
  type: 'inlineCode'
  value: string
}

interface Break extends Node {
  type: 'break'
}

interface Link extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'link'
  url: string
  title: string | null
}

interface Image extends Node {
  type: 'image'
  url: string
  title: string | null
  alt: string | null
}

interface InlineImage extends Node {
  type: 'inlineImage'
  url: string
  title: string | null
  alt: string | null
}

interface Table extends Node, ParentOf<TableRow[]> {
  type: 'table'
  header: TableRow
  children: TableRow[]
}

interface TableRow extends Node, ParentOf<TableCell[]> {
  type: 'tableRow'
}

interface TableCell extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'tableCell'
}

interface Delete extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'delete'
}

interface Footnote extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'footnote'
}

interface InlineFootnote extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'inlineFootnote'
}

interface TextDirective extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'textDirective'
  name: string
  attributes: Record<string, string>
}

interface LeafDirective extends Node, ParentOf<UniversalInlineContent[]> {
  type: 'leafDirective'
  name: string
  attributes: Record<string, string>
}

interface ContainerDirective extends Node, ParentOf<UniversalBlockContent[]> {
  type: 'containerDirective'
  name: string
  attributes: Record<string, string>
}

interface Gallery extends Node, ParentOf<Image[]>{
  type: 'gallery'
}

```

### The difference between rmdast v2 and mdast v4

All reference nodes will be converted to no reference nodes:
- `ImageReference` are converted to `Image`.
- `LinkReference` are converted to `Link`.
- `FootnoteReference` are converted to `Footnote`.

The `Footnote` nodes have been renamed to `InlineFootnote`.

The `Image` nodes are now divided into two types: `InlineImage` and `Image`.

The `Paragraph` only containing `InlineImage` now be parsed as `Image`.

The top-level `ListItem` with `Image` now be parsed as `Gallery`.

The `align` of `Table` node have been removed, `header` have been added.

The following nodes are not supported:
- `YAML`

The following node types are removed:
- `HTML`
- `Definition`
- `FootnoteDefinition`
- `ListContent`
- `TableContent`
- `RowContent`

The following node properties are removed:
- `data`
- `position`

#### Why is there a `Gallery` node type?
It is a common requirement to display multiple images with one component, but the syntax of Markdown determines that each image is independent, and it is difficult to link them together at the AST level.

To solve this problem, RMDAST specifically adds this node type.

##### Can't this be done through directive?
Yes, but not elegant.

The following Markdown text generates redundant text nodes(`\n`):
```markdown
:::gallery
![](a)
![](b)
![](c)
:::
```

The following Markdown text has redundant blank lines:
```markdown
:::gallery
![](a)

![](b)

![](c)
:::
```

## API

### parse

```ts
function parse(text: string): RMDAST.Root
```

### is

Each rmdast node has a corresponding `is` function.
