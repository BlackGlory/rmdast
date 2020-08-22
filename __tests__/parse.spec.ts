import { parse } from '@src/parse'
import { stripIndent } from 'common-tags'

describe('parse', () => {
  it('test', () => {
    const markdown = stripIndent`
      Bad
          <div class="note">

      A mix of *Markdown* and <em>HTML</em>.
      </div>

      123

      Good <sub>Sub</sub><sup>Sup</sup>
      why?

      <youtube-dl class="note">

      A mix of *Markdown* and <em>HTML</em>.
      </youtube-dl> EATEN
    `
    const result = parse(markdown)
    console.log(JSON.stringify(result, null, 2))
  })
})
