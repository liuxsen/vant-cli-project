import execa from 'execa';
import { setNodeEnv, isDir, isStyle, isSfc, isScript } from '../common/index'
import { clean } from './clean'
import fse, { existsSync } from 'fs-extra'
import { SRC_DIR, ES_DIR, LIB_DIR, getVueVersion, CWD } from '../common/constant'
import { ora, consola } from '../common/logger'
import { Format } from 'esbuild'
import { join, relative } from 'path'
import { compileStyle } from '../compiler/compile-style'
import { genPackageEntry } from '../compiler/gen-package-entry'
import { compileSfc } from '../compiler/compile-sfc'
import { compileScript } from '../compiler/compile-script'
import { compileSfcV2 } from '../compiler/compile-sfc-v2'
import { compileBundles } from '../compiler/compile-bundles'
import { CSS_LANG } from '../common/css'

const { copy, readdir } = fse

const copySourceCode = () => {
  return Promise.all([
    copy(SRC_DIR, ES_DIR),
    copy(SRC_DIR, LIB_DIR)
  ])
}

// 编译文件
const compileFile = async (filePath: string, format: Format) => {
  if (isStyle(filePath)) {
    return compileStyle(filePath)
  } else if (isScript(filePath)) {
    return compileScript(filePath, format)
  }
}

const compileDir = async (dir: string, format: Format) => {
  const files = await readdir(dir)
  const pms = files.map(fileName => {
    const filePath = join(dir, fileName)
    return isDir(filePath)
      ? compileDir(filePath, format)
      : compileFile(filePath, format)
  })
  return await Promise.all(pms)
}

const preCompileDir = async (dir: string) => {
  const files = await readdir(dir)
  await Promise.all(
    files.map(fileName => {
      const filePath = join(dir, fileName)
      // TODO: ignore demo and test dir
      if (isDir(filePath)) {
        return preCompileDir(filePath)
      }
      if (isSfc(filePath)) {
        const vueversion = getVueVersion()
        // if (vueversion === '2') {
        return compileSfcV2(filePath)
        // }
        // return compileSfc(filePath)
      }
      return Promise.resolve()
    })
  )
}

const buildTypeDeclarations = async () => {
  await Promise.all([
    preCompileDir(ES_DIR),
    preCompileDir(LIB_DIR)
  ])
  const tsConfig = join(CWD, 'tsconfig.declaration.json')
  if(existsSync(tsConfig)){
    await execa('tsc', ['-p', tsConfig])
  }
}

const buildESMOutputs = async () => {
  await compileDir(ES_DIR, 'esm')
}
const buildCJSOutputs = async () => {
  await compileDir(LIB_DIR, 'cjs')
}
// 生成包入口
const buildPackageScriptEntry = async () => {
  const esEntryFile = join(ES_DIR, 'index.js')
  const libEntryFile = join(LIB_DIR, 'index.js')
  const hasIndex = existsSync(join(SRC_DIR, 'index.ts'))
  if(hasIndex){
    return;
  }
  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`
  })

  await copy(esEntryFile, libEntryFile)
}

const buildBundledOutputs = async () => {
  await compileBundles()
}

// const buildPackageStyleEntry = async () => {
//   const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`)

//   genpackageStyle({

//   })
// }

const tasks = [
  { text: 'Copy Source Code', task: copySourceCode },
  { text: 'Build Package Script Entry', task: buildPackageScriptEntry },
  // {
  //   text: 'Build Package Style Entry',
  //   task: buildPackageStyleEntry
  // },
  { text: 'BuiBuild Type Declarations', task: buildTypeDeclarations },
  { text: 'Build ESModule Outputs', task: buildESMOutputs },
  { text: 'Build CJSodule Outputs', task: buildCJSOutputs },
  { text: 'Build Bundled Outputs', task: buildBundledOutputs }
]

const runBuildTasks = async () => {
  for (let i = 0; i < tasks.length; i++) {
    const { text, task } = tasks[i]
    const spinner = ora(text).start()
    try {
      await task()
      spinner.succeed()
    } catch (err) {
      spinner.fail(text)
      console.log(err)
    }
  }
  consola.success('Compile successfully')
}

export async function build () {
  setNodeEnv('production')
  await clean()
  await runBuildTasks()
}
