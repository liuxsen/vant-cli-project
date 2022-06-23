import { existsSync, readdirSync } from 'fs-extra'
import { SRC_DIR } from '../common/constant'
import { join } from 'path'
import { pascalize } from '../common'
import { normalizePath } from '../common/index'

const genCode = (components: string[]) => {
  const demos = components.map(componet => {
    return {
      componet,
      name: pascalize(componet),
      path: join(SRC_DIR, componet, 'demo', 'index.vue')
    }
  }).filter(item => {
    return existsSync(item.path)
  })
  const importStr = demos.map(item => {
    const path = normalizePath(item.path)
    return `import ${pascalize(item.name)} from '${path}'`
  }).join('\n')
  const componentsList = demos.map(item => {
    return `{name: '${item.name}', component: ${pascalize(item.name)}}`
  }).join(',\n')
  // export {  }
  return `
    ${importStr}
    export const components = [${componentsList}]
  `
}

export const genSiteDemoShared = () => {
  const dirs = readdirSync(SRC_DIR)
  const code = genCode(dirs)
  return code
}
