const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))$/g
export const CSS_LANG = 'less'

// replace import './base.less;' to import './base.css;'
export const replaceCssImportExt = (code: string) => {
  return code.replace(IMPORT_STYLE_RE, str => {
    return str.replace(`.${CSS_LANG}`, '.css')
  })
}
