import { Command } from 'commander'
import { cliVersion } from './index'
import { build } from './commands/build'
import { dev } from './commands/dev'

const program = new Command()

program
  .description('fe-awesome-cli')
  .version(`@vant/cli ${cliVersion}`)

program
  .command('build')
  .description('构建')
  .action(build)

program
  .command('dev')
  .description('development')
  .action(dev)

program.parse()
