import sass from 'sass'
import { remove } from 'fs-extra'

export const compileSass = (filePath: string) => {
  remove(filePath)
  const res = sass.compile(filePath)
  return res.css
}
