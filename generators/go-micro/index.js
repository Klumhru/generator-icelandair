const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const prompts = require('../_util/prompts')
const { coffeeFencing } = require('../_util/console')
// const { execSync } = require('child_process')

module.exports = yeoman.Base.extend({
  prompting() {
    const cb = this.async()

    if (!this.options.nested) {
      console.log(chalk.bold.yellow('Run `yo icelandair` to get started'))
      return
    }

    // const pathToGo = execSync('which go')
    // const go = pathToGo && pathToGo.toString().length > 3
    //
    // if (!go) {
    //   console.log(chalk.bold.red('You must have go https://golang.org/ installed locally to develop go micro services.'))
    //   return
    // }

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
        name: this.user.git.name(),
        email: this.user.git.email(),
        gitRepo: this.options.gitRepo,
      }

      const mv = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }

      this.fs.copyTpl([
        `${this.templatePath()}/**`,
      ], this.destinationPath(), tpl)

      mv('_editorconfig', '.editorconfig')
      mv('_gitattributes', '.gitattributes')
      mv('_gitignore', '.gitignore')
      mv('service-name.deployment.yml', `${tpl.projectName}.rc.yml`)
      mv('service-name.service.yml', `${tpl.projectName}.service.yml`)

      cb()
    })
  },
  install() {
    console.log(chalk.blue.bold('Installing dependencies.'))
    console.log(chalk.cyan.bold('This might take a while – maybe go for some coffee, or duel?'))
    coffeeFencing()
  },
})
