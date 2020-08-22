import { parse } from '@src/parse'

describe('parse', () => {
  it('test', () => {
    const markdown =
`
# Good
<div class="note">
A mix of *Markdown* and <em>HTML</em>.
</div>

# Bad
<div class="note">

A mix of *Markdown* and <em>HTML</em>.
</div>
`
    console.log(JSON.stringify(parse(markdown), null, 2))
  })
})
