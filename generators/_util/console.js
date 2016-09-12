/* eslint-disable max-len */
const chalk = require('chalk')

const coffee = () => {
  console.log(`\n       ${chalk.red('( (')}`)
  console.log(`        ${chalk.red(') )')}`)
  console.log(`      ${chalk.bold.red('........')}`)
  console.log(`      ${chalk.bold('|      |]')}`)
  console.log(`      ${chalk.bold('\\      /')}`)
  console.log(`       ${chalk.bold('`----\'')}\n`)
}

const fencing = () => {
  console.log(`\n         ${chalk.bold.blue(' m')}`)
  console.log(`         ${chalk.bold.blue('/')}`)
  console.log(`         ${chalk.bold.blue('\\C')}        ${chalk.bold.red('\\')}`)
  console.log(`       ${chalk.bold.blue('_ /`--|)----')} ${chalk.bold.red('\\_ O__/')}`)
  console.log(`       ${chalk.bold.blue('\\`\\')}          ${chalk.bold.red('`\\/_\\')}`)
  console.log(`      ${chalk.bold.blue('`` /_')}            ${chalk.bold.red('\\\\')}`)
  console.log(`                       ${chalk.bold.red('` \\')}`)
  console.log(`                         ${chalk.bold.red('-\'')}\n`)
}

const coffeeFencing = () => {
  console.log(`\n          ${chalk.red('( (')}                 ${chalk.bold.blue(' m')}`)
  console.log(`           ${chalk.red(') )')}                ${chalk.bold.blue('/')}`)
  console.log(`         ${chalk.bold.red('........')}             ${chalk.bold.blue('\\C')}        ${chalk.bold.red('\\')}`)
  console.log(`         ${chalk.bold('|      |]')}          ${chalk.bold.blue('_ /`--|)----')} ${chalk.bold.red('\\_ O__/')}`)
  console.log(`         ${chalk.bold('\\      /')}           ${chalk.bold.blue('\\`\\')}          ${chalk.bold.red('`\\/_\\')}`)
  console.log(`          ${chalk.bold('`----\'')}           ${chalk.bold.blue('`` /_')}            ${chalk.bold.red('\\\\')}`)
  console.log(`                                            ${chalk.bold.red('` \\')}`)
  console.log(`                                              ${chalk.bold.red('-\'')}\n`)

  console.log(chalk.cyan.bold('You earned yourself a break – maybe go for some coffee, or duel?'))
}
/* eslint-enable max-len */

const bail = (_projectName = '') => {
  console.log(
    chalk.yellow('- ') +
    chalk.yellow.bold(`Bailing out on '${_projectName}' due to user input`)
  )
}

const lgtm = () => {
  console.log(
    chalk.cyan('- ') +
    chalk.cyan.bold('All set! Just run ') +
    chalk.green.bold('npm install') +
    chalk.cyan.bold(' to get started.')
  )
}

module.exports = {
  coffee,
  fencing,
  coffeeFencing,
  bail,
  lgtm,
}
