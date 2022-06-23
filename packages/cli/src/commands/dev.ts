import { compileSite } from '../compiler/compile-site'

export const dev = async () => {
  await compileSite()
}
