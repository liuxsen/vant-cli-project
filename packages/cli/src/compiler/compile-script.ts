import esbuild, { type Format } from 'esbuild'
import { outputFileSync, readFileSync } from 'fs-extra'
import { replaceCssImportExt } from '../common/css'
import { replaceScriptImportExt } from './get-deps'
import { replaceExt } from '../common/index'

export const compileScript = async (filePath: string, format: Format): Promise<void> => {
  if (filePath.includes('.d.ts')) {
    return
  }
  let code = readFileSync(filePath, 'utf-8')

  const extention = '.js'

  code = replaceCssImportExt(code)
  code = replaceScriptImportExt(code, filePath, extention)

  const esbuildResult = await esbuild.transform(code, {
    loader: 'ts',
    target: 'es2016',
    format
  })

  code = esbuildResult.code
  const jsFilePath = replaceExt(filePath, extention)
  outputFileSync(jsFilePath, code)
}
