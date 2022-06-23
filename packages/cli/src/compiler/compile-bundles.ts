import { build } from 'vite'
import { getPckageJSON } from '../common/constant'
import { getViteConfigForPackage } from '../config/vite.package'

export const compileBundles = async () => {
  const dependencies = getPckageJSON().dependencies || {}
  const externals = Object.keys(dependencies)

  const configs = [
    // umd bundle
    getViteConfigForPackage({
      minify: false,
      formats: ['umd'],
      external: ['vue']
    }),
    // umd bundle minified
    getViteConfigForPackage({
      minify: true,
      formats: ['umd'],
      external: ['vue']
    }),
    // esm/cjs bundle
    getViteConfigForPackage({
      minify: false,
      formats: ['es', 'cjs'],
      external: ['vue', ...externals]
    }),
    // esm/cjs bundle minifiled
    getViteConfigForPackage({
      minify: true,
      formats: ['es', 'cjs'],
      external: ['vue', ...externals]
    })
  ]

  await Promise.all(
    configs.map(config => {
      return build(config)
    })
  )
}
