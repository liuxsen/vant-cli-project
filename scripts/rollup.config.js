import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

const commonPlugins = [
  typescript()
]

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: resolve(__dirname, '../packages', 'atom/base.less'),
    output: [
      { file: 'packages/atom/dist' }
    ],
    plugins: [
      postcss({})
    ]
  },
  // hmui
  {
    input: resolve(__dirname, '../packages', 'h-mui/index.ts'),
    output: [
      {
        file: 'dist/h-mui/index.es.js',
        format: 'es'
      },
      {
        file: 'dist/h-mui/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/h-mui/index.umd.js',
        name: 'HMUI',
        format: 'umd'
      }
    ],
    plugins: [
      ...commonPlugins
    ]
  },
  // hui
  {
    input: resolve(__dirname, '../packages', 'h-ui/index.ts'),
    output: [
      {
        file: 'dist/h-ui/index.es.js',
        format: 'es'
      },
      {
        file: 'dist/h-ui/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/h-ui/index.umd.js',
        name: 'HUI',
        format: 'umd'
      }
    ],
    plugins: [
      ...commonPlugins
    ]
  },
  // utils
  {
    input: resolve(__dirname, '../packages', 'utils/index.ts'),
    output: [
      {
        file: 'dist/utils/index.es.js',
        format: 'es'
      },
      {
        file: 'dist/utils/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/utils/index.umd.js',
        name: 'HUI',
        format: 'umd'
      }
    ],
    plugins: [
      ...commonPlugins
    ]
  }
]

export default config
