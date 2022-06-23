import less from 'less'
import { readFileSync } from 'fs'
import { remove } from 'fs-extra'

export const compileLess = async (filePath: string) => {
  remove(filePath)
  const source = readFileSync(filePath, 'utf-8')
  const res = await less.render(source)
  return res.css
}
