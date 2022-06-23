import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import { transform } from 'esbuild'
import { POSTCSS_CONFIG_FILE } from '../common/constant'

// post-css api: https://github.com/postcss/postcss/blob/main/docs/README-cn.md
export const compileCss = async (source: string | Buffer) => {
  const config = await postcssrc({}, POSTCSS_CONFIG_FILE)
  const { css } = await postcss(config.plugins)
    .process(source, {})
  // https://esbuild.github.io/api/#target
  const result = await transform(css, {
    loader: 'css',
    minify: true,
    target: ['chrome53', 'safari10']
  })
  return result.code
}
