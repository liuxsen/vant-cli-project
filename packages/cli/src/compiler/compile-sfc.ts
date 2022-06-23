import { outputFile, readFileSync, remove } from 'fs-extra'
import { parse, SFCStyleBlock, compileTemplate } from '@vue/compiler-sfc'

import { replaceExt } from '../common'
import hash from 'hash-sum'
import path from 'path'

const VUEIDS = '__vue_sfc__'
const EXPORT = 'export default'
const RENDER_FN = '__vue_render__'

// trim some unused code
function trim (code: string) {
  return code.replace(/\/\/\n/g, '').trim()
}

const parseSfc = (filename: string) => {
  const source = readFileSync(filename, 'utf-8')
  const { descriptor } = parse(source, {
    filename
  })
  return descriptor
}

function getSfcStylePath (filePath: string, ext: string, index: number) {
  const number = index !== 0 ? `-${index + 1}` : ''
  return replaceExt(filePath, `-sfc${number}.${ext}`)
}

const injectStyle = (script: string, styles: SFCStyleBlock[], filePath: string) => {
  if (styles.length) {
    // TODO
    const imports = styles.map((style, index) => {
      const parseInfo = path.parse(getSfcStylePath(filePath, 'css', index))
      console.log(parseInfo)
      return `import './${parseInfo.base}'`
    }).join('\n')
    script = `${imports}\n${script}`
    return script
  } else {
    return script
  }
}

function injectScopeId (script: string, scopeId: string) {
  script += `\n${VUEIDS}._scopeId = '${scopeId}'`
  return script
}

// inject render fn to script
function injectRender (script: string, render: string) {
  script = trim(script)

  render = render.replace('export function render', `function ${RENDER_FN}`)

  script += `\n${render}\n${VUEIDS}.render = ${RENDER_FN} \n`

  return script
}

export const compileSfc = async (filePath: string) => {
  const tasks = [remove(filePath)]
  const source = readFileSync(filePath, 'utf-8')
  const descriptor = parseSfc(filePath)
  // template
  const { template, styles } = descriptor
  const hasScoped = styles.some(style => style.scoped)
  const scopeId = hasScoped ? `data-v-${hash(source)}` : ''
  // compile style part
  tasks.push(
    ...styles.map(async (style, index) => {
      const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index)
      const styleSource = trim(style.content)
      return outputFile(cssFilePath, styleSource)
    })
  )
  // compile js part
  if (descriptor.script || descriptor.scriptSetup) {
    const lang = descriptor.script?.lang || descriptor.scriptSetup?.lang || 'js'
    const scriptFilePath = replaceExt(filePath, `.${lang}`)

    tasks.push(
      new Promise((resolve) => {
        let script = ''
        if (lang === 'ts') {
          script += '// @ts-nocheck\n'
        }
        script += descriptor.script!.content
        script = injectStyle(script, styles, filePath)
        script = script.replace(EXPORT, `const ${VUEIDS} =`)

        if (template) {
          const render = compileTemplate({
            id: scopeId,
            source: template.content,
            filename: filePath
          }).code

          script = injectRender(script, render)
        }

        if (scopeId) {
          script = injectScopeId(script, scopeId)
        }

        script += `\n${EXPORT} ${VUEIDS}`
        outputFile(scriptFilePath, script).then(resolve)
      })
    )
  }
  return Promise.all(tasks)
}
