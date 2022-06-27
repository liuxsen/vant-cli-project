import { transformSync} from "@babel/core";
import { outputFileSync, readFileSync } from 'fs-extra'
import { replaceCssImportExt } from '../common/css'
import { replaceScriptImportExt } from './get-deps'
import { replaceExt } from '../common/index'
import { join } from 'path';

export const compileScript = async (filePath: string, format: string): Promise<void> => {
  if (filePath.includes('.d.ts')) {
    return
  }
  let code = readFileSync(filePath, 'utf-8')

  const extention = '.js'

  code = replaceCssImportExt(code)
  code = replaceScriptImportExt(code, filePath, extention)

  // const esbuildResult = await esbuild.transform(code, {
  //   loader: 'ts',
  //   target: [
  //     // 'ie9',
  //     // 'ios10',
  //     // "node12",
  //     "es2016"
  //   ],
  //   drop: ['console'],
  //   format
  // })
  const configFile = join(__dirname, '../../.babelrc.js')
  const buildResult = transformSync(code, {
    // configFile
    // https://babeljs.io/docs/en/babel-preset-env#modules
    // 
    presets: [['@babel/preset-env', {
      modules: format === 'esm' ? false : 'cjs', // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto"
      // useBuiltIns: 'usage', corejs: 3
    }]],
    plugins: [
      ['@babel/plugin-transform-typescript']
    ]
  })

  code = buildResult.code
  const jsFilePath = replaceExt(filePath, extention)
  outputFileSync(jsFilePath, code)
}
