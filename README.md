# rmdast

**R**enderable **M**ark**d**own **A**bstract **S**yntax **T**ree.

rmdast is an easy-to-render version of [mdast v4],
the new AST is designed to render nodes directly from AST to any platform, e.g. React.
So you can precisely control the translation results by recursive descent analysis.

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

## API

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
| Newline
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
| Newline
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

interface Newline extends Node {
  type: 'newline'
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

#### The difference between rmdast and mdast v4

All reference nodes will be converted to no reference nodes:
- `ImageReference` are converted to `Image`.
- `LinkReference` are converted to `Link`.
- `FootnoteReference` are converted to `Footnote`.

The `Footnote` nodes have been renamed to `InlineFootnote`.

The `Image` nodes are now divided into two types: `InlineImage` and `Image`.

The `Text` nodes are now divided into two types: `Text` and `Newline`.

The `Paragraph` nodes with only `InlineImage` as a child are now parsed as `Image`.

The top-level `ListItem` nodes with `Image` are now parsed as `Gallery`.

Removed `align` from `Table`, added `header`.

The following node types are not supported:
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

##### Why is there a `Gallery` node type?
It is a common requirement to display multiple images with a single component,
but the syntax of Markdown determines that each image is independent,
and it is difficult to link them at the AST level.

To solve this problem, rmdast adds this node type.

###### Can't this be done through directive?
Yes, but not elegant.

The following Markdown text has additional text nodes(`\n`):
```markdown
:::gallery
![](a)
![](b)
![](c)
:::
```

The following Markdown text has additional blank lines:
```markdown
:::gallery
![](a)

![](b)

![](c)
:::
```

### parse

```ts
function parse(text: string): AST.Root
```

### utils

#### builder

```ts
import {} from 'rmdast/utils/builder.js'
```

Each rmdast node has a corresponding builder.

#### is

```ts
import {} from 'rmdast/utils/is.js'
```

Each rmdast node has a corresponding `is` function.

#### flatMap

```ts
import { flatMap } from 'rmdast/utils/flat-map.js'

function flatMap(
  node: AST.Node
, fn: (node: AST.Node) => AST.Node[]
): AST.Node[]
```

#### map

```ts
import { map } from 'rmdast/utils/map.js'

function map(
  node: AST.Node
, fn: (node: AST.Node) => AST.Node
): AST.Node
```

#### filter

```ts
import { filter } from 'rmdast/utils/filter.js'

function filter(
  node: AST.Node
, predicate: (node: AST.Node) => unknown
): AST.Node | undefined
```

#### find

```ts
import { find } from 'rmdast/utils/find.js'

function find<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): T | undefined
```

#### findAll

```ts
import { findAll } from 'rmdast/utils/find-all.js'

function* findAll<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): Iterable<T>
```

#### traverseDescendantNodes

```ts
function traverseDescendantNodes(node: AST.Node): Iterable<AST.Node>
```

#### addHelpers

```ts
import { addHelpers, addHelpersInPlace, NodeWithHelpers } from 'rmdast/utils/add-helpers.js'

type NullOrNodeWithHelpers<T extends AST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

type NodeWithHelpers<
  Node extends AST.Node
, Sibling extends AST.Node | null = AST.Node | null
, Parent extends AST.Node | null = AST.Node | null
> =
  Node extends AST.Root
  ? Mixin<Node, {
      id: string
      parent: null
      index: null
      previousSibling: null
      nextSibling: null
      children: Array<NodeWithHelpers<AST.RootContent, AST.RootContent, AST.Root>>
    }>
: Node extends AST.Paragraph
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Paragraph
        >
      >
    }>
: Node extends AST.Heading
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.Heading
        >
      >
    }>
: Node extends AST.Blockquote
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalBlockContent
        , AST.UniversalBlockContent
        , AST.Blockquote
        >
      >
    }>
: Node extends AST.List
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.ListItem, AST.ListItem, AST.List>>
    }>
: Node extends AST.ListItem
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalBlockContent, AST.UniversalBlockContent, AST.ListItem>>
    }>
: Node extends AST.Emphasis
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalInlineContent, AST.UniversalInlineContent, AST.Emphasis>>
    }>
: Node extends AST.Strong
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalInlineContent, AST.UniversalInlineContent, AST.Strong>>
    }>
: Node extends AST.Link
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalInlineContent, AST.UniversalInlineContent, AST.Link>>
    }>
: Node extends AST.Table
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      header: NodeWithHelpers<AST.TableRow, null, AST.Table>
      children: Array<NodeWithHelpers<AST.TableRow, AST.TableRow, AST.Table>>
    }>
: Node extends AST.TableRow
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: Sibling extends null ? null : number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.TableCell, AST.TableCell, AST.TableRow>>
    }>
: Node extends AST.TableCell
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalInlineContent, AST.UniversalInlineContent, AST.TableCell>>
    }>
: Node extends AST.Delete
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<NodeWithHelpers<AST.UniversalInlineContent, AST.UniversalInlineContent, AST.Delete>>
    }>
: Node extends AST.Footnote
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalBlockContent
        , AST.UniversalBlockContent
        , AST.Footnote
        >
      >
    }>
: Node extends AST.InlineFootnote
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.InlineFootnote
        >
      >
    }>
: Node extends AST.TextDirective
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.TextDirective
        >
      >
    }>
: Node extends AST.LeafDirective
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalInlineContent
        , AST.UniversalInlineContent
        , AST.LeafDirective
        >
      >
    }>
: Node extends AST.ContainerDirective
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.UniversalBlockContent
        , AST.UniversalBlockContent
        , AST.ContainerDirective
        >
      >
    }>
: Node extends AST.Gallery
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<AST.Root>
      index: number
      previousSibling: null
      nextSibling: null
      children: Array<NodeWithHelpers<AST.Image, AST.Image, AST.Gallery>>
    }>
: Mixin<Node, {
    id: string
    parent: NullOrNodeWithHelpers<Parent>
    index: number | null
    previousSibling: NullOrNodeWithHelpers<Sibling>
    nextSibling: NullOrNodeWithHelpers<Sibling>
  }>

function addHelpers<T extends AST.Node>(node: T): NodeWithHelpers<T>
function addHelpersInPlace<T extends AST.Node>(node: T): NodeWithHelpers<T>
```

#### removeHelpers

```ts
import { removeHelpers, removeHelpersInPlace } from 'rmdast/utils/remove-helpers.js'

function remove

function removeHelpersInPlace<T extends AST.Node>(node: NodeWithHelpers<T>): T
```

#### withHelpers

```ts
import { withHelpers, withHelpersInPlace } from 'rmdast/utils/with-helpers.js'

function withHelpers<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U

function withHelpersInPlace<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U
```
