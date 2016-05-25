const chalk = require('chalk')

module.exports = (tpl, spawn) => {
  if (!tpl.gitRepo) {
    console.log(
      chalk.bold.red('Wont initialize git since no tpl.gitRepo was provided')
    )
    return
  }

  chalk.bold.red('Initializing git with', tpl)

  spawn('git', ['init'], { stdio: 'ignore' })
  spawn('git', ['flow', 'init', '-d'], { stdio: 'ignore' })
  spawn('git', ['config', 'gitflow.prefix.versiontag', 'v'], { stdio: 'ignore' })
  spawn('git', ['remote', 'add', 'origin', `git@github.com:${tpl.gitRepo}.git`], { stdio: 'ignore' })
  spawn('git', ['add', '-A'], { stdio: 'ignore' })
  spawn('git', ['commit', '-m', `Generated new ${tpl.projectType}`], { stdio: 'ignore' })

  console.log(
    chalk.bold.cyan('Initialized git repository with flow config & commited generated code\n') +
    chalk.bold.cyan('Make sure to a create repository with the name ') +
    chalk.bold.green(tpl.gitRepo) +
    chalk.bold.cyan(' on GitHub before pushing.')
  )
}
