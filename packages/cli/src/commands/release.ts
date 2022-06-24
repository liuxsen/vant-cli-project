import { readFileSync, outputFileSync  } from 'fs-extra';
import { CWD } from '../common/constant';
import { join } from 'path';
import chalk from 'chalk';
export const  release = async (command: { tag?: string }) => {
  const packageJson = require(join(CWD, 'package.json'))
  const fromVersion = packageJson.version || '1.0.0'
  const toVersion = fromVersion.replace(/^([\d\.]+)([\-|\.])(\d+)$/, function () {
    return arguments[1] + arguments[2] + (Number(arguments[3]) + 1)
  })
  packageJson.version = toVersion
  outputFileSync(CWD + '/package.json', JSON.stringify(packageJson, null, '  '))
  console.log(chalk.green('released done!', packageJson.name, `${fromVersion} => ${toVersion}`))
}
