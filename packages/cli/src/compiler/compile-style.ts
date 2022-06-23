import { readFileSync, writeFileSync } from 'fs-extra'
import { parse } from 'path'
import { compileCss } from './compile-css'
import { compileLess } from './compile-less'
import { compileSass } from './compile-sass'
import { replaceExt } from '../common/index'

// 编译css
const compileFile = async (filePath: string) => {
  const parsedPath = parse(filePath)
  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      const goodCss = await compileCss(source)
      return goodCss
    }
    if (parsedPath.ext === '.scss') {
      const source = compileSass(filePath)
      const goodCss = await compileCss(source)
      return goodCss
    }
    const source = readFileSync(filePath, { encoding: 'utf-8' })
    return await compileCss(source)
  } catch (error) {
    console.error('Compile style faild:' + filePath)
    throw error
  }
}

export const compileStyle = async (filePath: string) => {
  const css = await compileFile(filePath)
  writeFileSync(replaceExt(filePath, '.css'), css)
}
