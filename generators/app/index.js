'use strict'
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')

const fs = require('fs')
const path = require('path')

let projectType
let gitRepo

module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async()

    const projectTypes = []

    fs.readdirSync(path.resolve(__dirname, '../')).filter((file) => {
      if (file !== 'app' && fs.statSync(path.resolve(__dirname, '../', file)).isDirectory()) {
        projectTypes.push(_s.humanize(file))
      }
      return fs.statSync(path.resolve(__dirname, '../', file)).isDirectory() ? file : false
    })

    this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you need?',
      default: projectTypes[0],
      choices: projectTypes,
      validate: x => x.length > 0 ? true : 'You have to pick a project type',
    }, {
      type: 'input',
      name: 'gitRepo',
      message: 'Name of git repository? Icelandair/**',
      default: _s.slugify(this.appname),
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
    console.log('Initialized git repository with flow config, and commited generated code.\nCurrent status:')
    this.spawnCommandSync('git', ['status'])
    console.log(`Unpushed. Make sure to create repository with the name "${gitRepo}" on GitHub before pushing.`)
  },
})
