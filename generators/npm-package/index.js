const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const prompts = require('../_util/prompts')
const { coffeeFencing } = require('../_util/console')

let tpl

module.exports = yeoman.Base.extend({
  prompting() {
    const cb = this.async()

    if (!this.options.nested) {
      console.log(chalk.bold.yellow('Run `yo icelandair` to get started'))
      return
    }

    const promptArr = []

    promptArr.push(prompts.projectName(this.options.gitRepo.split('/').pop()))
    promptArr.push(prompts.projectDescription())
    promptArr.push(prompts.confirm('cli', 'Do you need a cli?', false))

    this.prompt(promptArr, (props) => {
      tpl = {
        projectName: props.projectName,
        camelProjectName: _s.camelize(props.projectName),
        projectDescription: props.projectDescription,
        name: this.user.git.name(),
        email: this.user.git.email(),
        cli: props.cli,
      }

      const mv = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }

      this.fs.copyTpl([
        `${this.templatePath()}/**`,
        '!**/cli.js',
      ], this.destinationPath(), tpl)

      if (props.cli) {
        this.fs.copyTpl(this.templatePath('cli.js'), this.destinationPath('cli.js'), tpl)
      }

      mv('_babelrc', '.babelrc')
      mv('_editorconfig', '.editorconfig')
      mv('_eslintrc', '.eslintrc')
      mv('_gitattributes', '.gitattributes')
      mv('_gitignore', '.gitignore')
      mv('_package.json', 'package.json')

      cb()
    })
  },
  install() {
    console.log(chalk.blue.bold('Installing dependencies.'))
    console.log(chalk.cyan.bold('This might take a while – maybe go for some coffee, or duel?'))
    coffeeFencing()

    if (tpl.cli) {
      this.npmInstall([
        'meow',
      ], { save: true, stdio: 'ignore' })
    }
    this.npmInstall([
      'ava',
      'babel-cli',
      'babel-eslint',
      'babel-plugin-add-module-exports',
      'babel-plugin-syntax-async-functions',
      'babel-plugin-transform-regenerator',
      'babel-preset-es2015-node6',
      'babel-register',
      'eslint',
      'eslint-config-icelandair',
      'eslint-plugin-import',
      'nyc',
    ], { saveDev: true, stdio: 'ignore' })
  },
})
