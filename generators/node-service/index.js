const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const prompts = require('../_util/prompts')
const { coffeeFencing } = require('../_util/console')

module.exports = yeoman.Base.extend({
  prompting() {
    const cb = this.async()

    if (!this.options.nested) {
      console.log(chalk.bold.yellow('Run `yo icelandair` to get started'))
      return
    }

    const promptArr = []

    promptArr.push(prompts.projectName(this.options.gitRepo.split('/').pop()))
    promptArr.push(prompts.type(this.options.gitRepo.split('/').pop()))
    promptArr.push(prompts.tier())
    promptArr.push(prompts.replicaCount())
    promptArr.push(prompts.containerPort())
    promptArr.push(prompts.projectDescription())

    this.prompt(promptArr, (props) => {
      const tpl = {
        projectName: props.projectName,
        camelProjectName: _s.camelize(props.projectName),
        type: props.type,
        tier: props.tier,
        replicaCount: props.replicaCount,
        containerPort: props.containerPort,
        projectDescription: props.projectDescription,
        name: this.user.git.name(),
        email: this.user.git.email(),
      }

      const rename = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }

      this.fs.copyTpl([
        `${this.templatePath()}/**`,
      ], this.destinationPath(), tpl)

      rename('_babelrc', '.babelrc')
      rename('_editorconfig', '.editorconfig')
      rename('_eslintrc', '.eslintrc')
      rename('_gitattributes', '.gitattributes')
      rename('_gitignore', '.gitignore')
      rename('_package.json', 'package.json')
      rename('service-name.deployment.yml', `${tpl.projectName}.deployment.yml`)
      rename('service-name.service.yml', `${tpl.projectName}.service.yml`)

      cb()
    })
  },
  install() {
    console.log(chalk.blue.bold('Installing dependencies.'))
    console.log(chalk.cyan.bold('This might take a while – maybe go for some coffee, or duel?'))
    coffeeFencing()

    this.npmInstall([
      'babel-plugin-transform-runtime',
      'koa',
      'koa-router',
    ], { save: true, stdio: 'ignore' })
    this.npmInstall([
      'ava',
      'babel-cli',
      'babel-eslint',
      'babel-plugin-add-module-exports',
      'babel-plugin-syntax-async-functions',
      'babel-plugin-transform-regenerator',
      'babel-preset-es2015',
      'babel-register',
      'eslint',
      'eslint-config-airbnb',
      'nyc',
      'supertest',
      'supertest-as-promised',
      'supervisor',
    ], { saveDev: true, stdio: 'ignore' })
  },
})
