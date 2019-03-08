const chalk = require('chalk')
const { exec } = require('shelljs')

console.log(chalk.green('removing old dist ...'))
exec('npm run clean')
console.log(chalk.green('building new dist ...'))
exec('npm run shell')
console.log(chalk.green('building is finished !'))
