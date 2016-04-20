import yeoman from 'yeoman-generator'
import _s from 'underscore.string'
import chalk from 'chalk'
import * as prompts from '../_util/prompts'

module.exports = yeoman.Base.extend({
  prompting() {
    const cb = this.async()
    const self = this

    if (!this.options.nested) {
      console.log(chalk.red(chalk.bold('Please don\'t run subgenerators directly')))
      return
    }

    const promptArr = []

    promptArr.push(prompts.projectName(this.options.gitRepo.split('/').pop()))
    promptArr.push(prompts.type(this.options.gitRepo.split('/').pop()))
    promptArr.push(prompts.tier)
    promptArr.push(prompts.replicaCount)
    promptArr.push(prompts.containerPort)
    promptArr.push(prompts.projectDescription)

    this.prompt(promptArr, (props) => {
      const tpl = {
        projectName: props.projectName,
        camelProjectName: _s.camelize(props.projectName),
        type: props.type,
        tier: props.tier,
        replicaCount: props.replicaCount,
        containerPort: props.containerPort,
        projectDescription: props.projectDescription,
        name: self.user.git.name(),
        email: self.user.git.email(),
      }

      const mv = (from, to) => {
        self.fs.move(self.destinationPath(from), self.destinationPath(to))
      }

      self.fs.copyTpl([
        `${self.templatePath()}/**`,
      ], self.destinationPath(), tpl)

      mv('_babelrc', '.babelrc')
      mv('_editorconfig', '.editorconfig')
      mv('_eslintrc', '.eslintrc')
      mv('_gitattributes', '.gitattributes')
      mv('_gitignore', '.gitignore')
      mv('_package.json', 'package.json')
      mv('service-name.rc.yml', `${tpl.projectName}.rc.yml`)
      mv('service-name.service.yml', `${tpl.projectName}.service.yml`)

      cb()
    })
  },
  install() {
    console.log(chalk.blue('Installing dependencies (relevant xkcd: http://xkcd.com/303/)'))
    this.npmInstall([
      'babel-plugin-transform-runtime',
      'koa',
      'koa-router',
    ], { save: true })
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
    ], { saveDev: true })
  },
})
