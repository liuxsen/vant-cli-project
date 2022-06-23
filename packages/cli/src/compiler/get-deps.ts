
// https://regexr.com/47jlq
const IMPORT_RE =
  /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
const EXPORT_FROM_RE =
  /@?export\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

function matchImports (code: string): string[] {
  const imports = code.match(IMPORT_RE) || []
  return imports.filter((line) => !line.includes('import type'))
}

function matchExportFroms (code: string): string[] {
  const exportFroms = code.match(EXPORT_FROM_RE) || []
  return exportFroms.filter((line) => !line.includes('export type'))
}

/**
 * 1. Replace .vue extension
 * @example import App from 'App.vue' => import App from 'App.xx'
 * 2. if using .mjs or .cjs complete the import path
 * @example import './foo' => import './foo.mjs'
 * @example import './foo' => import './foo/index.mjs'
 */
export const replaceScriptImportExt = (
  code: string,
  filePath: string,
  ext: string
) => {
  const imports = [
    ...matchImports(code),
    ...matchExportFroms(code)
  ]

  const updateImport = (index: number, newImport: string) => {
    code = code.replace(imports[index], newImport)
    imports[index] = newImport
  }

  imports.forEach((line, index) => {
    if (line.includes('.vue')) {
      updateImport(index, line.replace('.vue', ext))
    }
  })
  return code
}
