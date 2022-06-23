import { InlineConfig, LibraryFormats } from 'vite'
import { CWD, ES_DIR, LIB_DIR } from '../common/constant'
import { join } from 'path'
import { getCliConfig } from '../common'

export const getViteConfigForPackage = ({
  minify,
  formats,
  external
}: {
  minify: boolean,
  formats: LibraryFormats[],
  external: string[]
}) : InlineConfig => {
  const entry = join(ES_DIR, 'index.js')
  const name = getCliConfig().name
  return {
    root: CWD,
    logLevel: 'silent',
    build: {
      lib: {
        name,
        entry,
        formats,
        fileName: (format: string) => {
          const suffix = format === 'umd' ? '' : `.${format}`
          return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`
        }
      },
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          dir: LIB_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
}
