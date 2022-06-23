import { createVuePlugin as vue } from 'vite-plugin-vue2'
import { defineConfig, type UserConfig } from 'vite'
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const config: UserConfig = {
    base: './',
    plugins: [
      vue()
    ]
  }
  return config
})
