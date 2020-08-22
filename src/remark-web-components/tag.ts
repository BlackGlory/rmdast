const attributeName = /[a-zA-Z_:][a-zA-Z0-9:._-]*/
const unquoted = /[^"'=<>`\u0000-\u0020]+/
const singleQuoted = /'[^']*'/
const doubleQuoted = /"[^"]*"/
const attributeValue = new RegExp(
  '(?:'
      + unquoted.source
+ '|' + singleQuoted.source
+ '|' + doubleQuoted.source
+ ')'
)

const attribute = new RegExp(
  '(?:\\s+' // (?:\s+
+ attributeName.source
+ '(?:\\s*=\\s*' // (?:\s*=\s*
+ attributeValue.source
+ ')?)'
)

const openTag = new RegExp(
  '<[A-Za-z][A-Za-z0-9\\-]*'
+ attribute.source
+ '*\\s*\\/?>'
)
const closeTag = /<\/[A-Za-z][A-Za-z0-9\-]*\s*>/
const comment = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/
// const processing = /<[?].*?[?]>/
const declaration = /<![A-Za-z]+\s+[^>]*>/
const cdata = /<!\[CDATA\[[\s\S]*?\]\]>/

export const openCloseTag = new RegExp(
  '^(?:'
      + openTag.source
+ '|' + closeTag.source
+ ')')

export const tag = new RegExp(
  '^(?:'
      + openTag.source
+ '|' + closeTag.source
+ '|' + comment.source
// + '|' + processing.source
+ '|' + declaration.source
+ '|' + cdata.source
+ ')'
)
