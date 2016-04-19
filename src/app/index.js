import yeoman from 'yeoman-generator'
import _s from 'underscore.string'
import chalk from 'chalk'
import defaults from '../_util/defaults'
import * as validate from '../_util/validate'

let projectType
let gitRepo

module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async()

    this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you need?',
      default: defaults.generator,
      choices: defaults.generators,
      validate: (x) => validate.required(x, 'You have to pick a project type'),
    }, {
      type: 'input',
      name: 'gitRepo',
      message: 'Name of git repository? Icelandair/**',
      default: defaults.repoName,
      filter: x => `Icelandair/${x}`,
      validate: (x) => validate.required(x, 'You have to set a gitRepo'),
    }], props => {
      projectType = _s.slugify(props.projectType)
      gitRepo = props.gitRepo
      cb()
    })
  },
  startSubgenerator() {
    if (projectType) {
      this.spawnCommandSync('yo', [`icelandair:${projectType}`])
    }
  },
  git() {
    if (!gitRepo) {
      console.log(chalk.red('No gitRepo defined!'))
      return
    }
    this.spawnCommandSync('git', ['init'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['flow', 'init', '-d'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['config', 'gitflow.prefix.versiontag', 'v'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `git@github.com:${gitRepo}.git`], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['fetch', '-v'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['add', '-A'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['commit', '-m', `Generated new ${projectType}`], { stdio: 'ignore' })
    console.log(
      `${chalk.cyan('Initialized git repository with flow config, and commited generated code')}
      \n${chalk.yellow('Current status:')}`
    )
    this.spawnCommandSync('git', ['status'])
    console.log(
      `${chalk.yellow('Note: unpushed!')}
      \n${chalk.blue(`Make sure to create repository with the name "${gitRepo}" on GitHub before pushing.`)}`
    )
  },
})
