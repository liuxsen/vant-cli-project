import { readdirSync } from 'fs'
import { isDev, pascalize } from '../common'
import { SRC_DIR } from '../common/constant'
import { join } from 'path'

const formatName = (component: string, lang?: string) => {
  component = pascalize(component)
  if (lang) {
    return `${component}_${lang.replace('-', '_')}`
  } else {
    return component
  }
}

type DocumentItem = {
  name: string
  path: string
}

const resolveDocuments = (components: string[]): DocumentItem[] => {
  const docs: DocumentItem[] = []
  components.forEach((component) => {
    docs.push({
      name: formatName(component),
      path: join(SRC_DIR, component, 'READEM.md')
    })
  })
  return docs
}

const genImportDocuments = (items: DocumentItem[]) => {
  return items.map((item) => {
    const { name, path } = item
    if (isDev()) {
      return `const ${name} = () => import('${path}')`
    }
    return `import ${name} from '${path}'`
  }).join('\n')
}

const genExportDocuments = (items: DocumentItem[]) => {
  return `export const documents = {
    ${
      items.map(item => {
        return item.name
      }).join(',\n')
    }
  }
  `
}

export const genSiteDeskTopShared = () => {
  const dirs = readdirSync(SRC_DIR)
  const documents = resolveDocuments(dirs)
  const code = `${genImportDocuments(documents)}
${genExportDocuments(documents)}
  `
  console.log(code)
  return code
}
