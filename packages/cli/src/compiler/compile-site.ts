import { createServer } from 'vite'
import { getViteConfigForSiteDev } from '../config/vite.site'

export const compileSite = async (production = false) => {
  const config = getViteConfigForSiteDev()
  const server = await createServer(config)
  await server.listen()
  // console.log(`\n` + chalk.green(` dev server running at:\n`));
  server.printUrls()
  // if (production) {

  // } else {

  // }
}
