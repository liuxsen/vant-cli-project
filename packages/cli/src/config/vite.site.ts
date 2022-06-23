import { InlineConfig, PluginOption } from 'vite'
import { SITE_SRC_DIR } from '../common/constant'
import { createVuePlugin } from 'vite-plugin-vue2'
import vitePluginJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'
import Inspect from 'vite-plugin-inspect'
import { genSiteDeskTopShared } from '../compiler/gen-site-desktop-shared'
import { genSiteDemoShared } from '../compiler/gen-site-demo-shared'

const vitePluginGenBaseCode = (): PluginOption => {
  const virtualModuleId = 'site-desktop-shared'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const virtualDemoModuleId = 'site-demo-shared'
  const resolvedVirtualDemoModuleId = '\0' + virtualDemoModuleId
  return {
    name: 'vite-plugin-virtual',
    resolveId (id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      if (id === virtualDemoModuleId) {
        return resolvedVirtualDemoModuleId
      }
    },
    load (id) {
      console.log('id-----', id)
      if (id === resolvedVirtualModuleId) {
        return genSiteDeskTopShared()
      }
      if (id === resolvedVirtualDemoModuleId) {
        return genSiteDemoShared()
      }
    }
  }
}

export const getViteConfigForSiteDev = (): InlineConfig => {
  const config: InlineConfig = {
    root: SITE_SRC_DIR,
    plugins: [
      Inspect(),
      vitePluginGenBaseCode(),
      vitePluginJsx(),
      createVuePlugin({
        include: [/\.vue$/, /\.md$/]
      }),
      Markdown()
    ],
    server: {
      host: '0.0.0.0'
    }
  }
  return config
}
