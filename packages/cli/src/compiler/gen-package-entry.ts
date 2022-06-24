import { outputFileSync, existsSync } from 'fs-extra';
import { getComponents, normalizePath, pascalize } from '../common'
import { getPckageJSON, SRC_DIR } from '../common/constant'
import { join } from 'path'

type PathResolver = (path: string) => string;

function getPathByName (name: string, pathResolver?: PathResolver) {
  let path = join(SRC_DIR, name)
  if (pathResolver) {
    path = pathResolver(path)
  }
  return normalizePath(path)
}

export function genImports (
  names: string[],
  pathResolver?: PathResolver,
  namedExport?: boolean
): string {
  return names
    .map((name) => {
      const pascalName = pascalize(name)
      const importName = namedExport ? `{ ${pascalName} }` : pascalName
      const importPath = getPathByName(name, pathResolver)

      return `import ${importName} from '${importPath}';`
    })
    .join('\n')
}

export const genPackageEntry = ({
  outputPath,
  pathResolver
}: {
  outputPath: string;
  pathResolver?: PathResolver;
}) => {
  const version = getPckageJSON().version
  const components = getComponents()
  const importStr = genImports(components, pathResolver)
  const content = `
    ${importStr}
    const version = '${version}'
    const install = (app) => {
      const components = [
        ${components.join(',\n')}
      ]
      components.forEach((item) => {
        if(item.install){
          app.use(item)
        } else if (item.name) {
          app.component(item.name, item)
        } else {
          app.component(item)
        }
      })
    }

    export default {
      install,
      version
    }
  `
  outputFileSync(outputPath, content)
}
