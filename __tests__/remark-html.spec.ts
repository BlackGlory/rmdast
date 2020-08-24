import { parse } from '@src/parse'
import { root, html, paragraph, text } from '@test/builder'

describe('reamrk-html', () => {
  describe('comment', () => {
    it('single-line', () => {
      const markdown = '<!--Hello World-->'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html('<!--Hello World-->')
        ])
      )
    })

    it('single-line at the start', () => {
      const markdown = '<!--Hello-->World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            html('<!--Hello-->')
          , text('World')
          ])
        ])
      )
    })

    it('single-line in the middle', () => {
      const markdown = 'Hello<!---->World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello')
          , html('<!---->')
          , text('World')
          ])
        ])
      )
    })

    it('single-line at the end', () => {
      const markdown = 'Hello<!--World-->'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello')
          , html('<!--World-->')
          ])
        ])
      )
    })

    it('multi-line', () => {
      const markdown =
        '<!--' + '\n'
      + '  Hello' + '\n'
      + '  World' + '\n'
      + '-->'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html(
            '<!--' + '\n'
          + '  Hello' + '\n'
          + '  World' + '\n'
          + '-->'
          )
        ])
      )
    })
  })

  describe('tag', () => {
    it('single-line', () => {
      const markdown = '<html-tag switch prop=value>Hello World</html-tag>'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html('<html-tag switch prop=value>Hello World</html-tag>')
        ])
      )
    })

    it('single-line at the start', () => {
      const markdown = '<html-tag switch prop=value>Hello</html-tag>World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            html('<html-tag switch prop=value>Hello</html-tag>')
          , text('World')
          ])
        ])
      )
    })

    it('single-line in the middle', () => {
      const markdown = 'Hello<html-tag switch prop=value> </html-tag>World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello')
          , html('<html-tag switch prop=value> </html-tag>')
          , text('World')
          ])
        ])
      )
    })

    it('single-line at the end', () => {
      const markdown = 'Hello<html-tag switch prop=value>World</html-tag>'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello')
          , html('<html-tag switch prop=value>World</html-tag>')
          ])
        ])
      )
    })

    it('multi-line', () => {
      const markdown =
        '<html-tag' + '\n'
      + '  switch' + '\n'
      + '  prop=value' + '\n'
      + '>' + '\n'
      + '\n'
      + 'content' + '\n'
      + '\n'
      + '</html-tag>'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html(
            '<html-tag' + '\n'
          + '  switch' + '\n'
          + '  prop=value' + '\n'
          + '>' + '\n'
          + '\n'
          + 'content' + '\n'
          + '\n'
          + '</html-tag>'
          )
        ])
      )
    })
  })

  describe('self-closing tag', () => {
    it('single-line', () => {
      const markdown = '<html-tag switch prop=value />'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html('<html-tag switch prop=value />')
        ])
      )
    })

    it('single-line at the start', () => {
      const markdown = '<html-tag switch prop=value />Hello World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            html('<html-tag switch prop=value />')
          , text('Hello World')
          ])
        ])
      )
    })

    it('single-line in the middle', () => {
      const markdown = 'Hello<html-tag switch prop=value />World'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello')
          , html('<html-tag switch prop=value />')
          , text('World')
          ])
        ])
      )
    })

    it('single-line at the end', () => {
      const markdown = 'Hello World<html-tag switch prop=value />'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          paragraph([
            text('Hello World')
          , html('<html-tag switch prop=value />')
          ])
        ])
      )
    })

    it('multi-line', () => {
      const markdown =
        '<html-tag' + '\n'
      + '  switch' + '\n'
      + '  prop=value' + '\n'
      + '/>'

      const result = parse(markdown)

      expect(result).toMatchObject(
        root([
          html(
            '<html-tag' + '\n'
          + '  switch' + '\n'
          + '  prop=value' + '\n'
          + '/>'
          )
        ])
      )
    })
  })
})
