import * as fs from 'fs'
import path from 'path'

// https://github1s.com/youzan/vant/blob/ffefe3002f/packages/vant-cli/src/index.ts#L3
const packagePath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
export const cliVersion: string = packageJson.version

process.env.FCLI_VERSION = cliVersion
