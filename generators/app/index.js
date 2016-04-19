'use strict'
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const getDefaults = require('../../util/defaults')

let projectType
let gitRepo

module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async()

    const defaults = getDefaults(process.cwd())

    this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you need?',
      default: defaults.generator,
      choices: defaults.generators,
      validate: x => x.length > 0 ? true : 'You have to pick a project type',
    }, {
      type: 'input',
      name: 'gitRepo',
      message: 'Name of git repository? Icelandair/**',
      default: defaults.repoName,
      validate: x => x.length > 0 ? true : 'You have to set a gitRepo',
      filter: x => `Icelandair/${x}`,
    }], props => {
      projectType = _s.slugify(props.projectType)
      cb()
    })
  },
  startSubgenerator() {
    if (projectType) {
      this.spawnCommandSync('yo', [`icelandair:${projectType}`])
    }
  },
  git() {
    this.spawnCommandSync('git', ['init'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['flow', 'init', '-d'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['config', 'gitflow.prefix.versiontag', '"v"'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `git@github.com:${gitRepo}`], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['add', '-A'], { stdio: 'ignore' })
    this.spawnCommandSync('git', ['commit', '-m', `Generated new ${projectType}`], { stdio: 'ignore' })
    console.log(chalk.blue('Initialized git repository with flow config, and commited generated code.\nCurrent status:'))
    this.spawnCommandSync('git', ['status'])
    console.log(chalk.blue(`Unpushed. Make sure to create repository with the name "${gitRepo}" on GitHub before pushing.`))
  },
})
