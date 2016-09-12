const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const superb = require('superb')
const gitInit = require('../_util/git')
const { defaults } = require('../_util/defaults')
const prompts = require('../_util/prompts')
const { coffeeFencing } = require('../_util/console')
// const { execSync } = require('child_process')

module.exports = yeoman.Base.extend({
  initializing() {
    this.tpl = {
      projectType: 'go-micro',
    }
  },

  prompting: {
    askForProjectName() {
      const done = this.async()

      this.prompt(prompts.input(
        'projectName',
        `What's the name of your ${superb()} go micro service?`,
        defaults.projectName,
        (x) => x.trim()
      ), ({ projectName }) => {
        Object.assign(this.tpl, {
          projectName,
          camelProjectName: _s.camelize(projectName),
          projectPkgName: _s.slugify(projectName),
        })

        done()
      })
    },

    askForGitRepo() {
      const done = this.async()

      this.prompt(prompts.gitRepo(this.tpl.projectPkgName), (answers) => {
        Object.assign(this.tpl, answers, {
          name: this.user.git.name(),
          email: this.user.git.email(),
        })

        done()
      })
    },

    askForProjectDescription() {
      const done = this.async()

      this.prompt(prompts.projectDescription(undefined, this.tpl.projectName), (answers) => {
        Object.assign(this.tpl, answers)

        done()
      })
    },

    askForServiceStuff() {
      const done = this.async()

      const promptArr = []
      promptArr.push(prompts.type(this.tpl.gitRepo.split('/').pop()))
      promptArr.push(prompts.tier())
      promptArr.push(prompts.replicaCount())
      promptArr.push(prompts.containerPort())

      this.prompt(promptArr, (answers) => {
        Object.assign(this.tpl, answers)

        done()
      })
    },

    askForConfirmation() {
      const done = this.async()

      this.prompt(prompts.done(), (answers) => {
        Object.assign(this.tpl, answers)

        done()
      })
    },
  },

  writing: {
    projectfiles() {
      if (!this.tpl.confirm) { return }

      const done = this.async()

      this.fs.copyTpl([
        `${this.templatePath()}/**`,
      ], this.destinationPath(), this.tpl)

      const rename = (from, to) => {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }

      rename('_editorconfig', '.editorconfig')
      rename('_gitattributes', '.gitattributes')
      rename('_gitignore', '.gitignore')
      rename('_dockerignore', '.dockerignore')
      rename('service-name.deployment.yml', `micro.${this.tpl.projectName}.deployment.yml`)
      rename('service-name.service.yml', `micro.${this.tpl.projectName}.service.yml`)
      rename('_Dockerfile', 'Dockerfile')
      rename('_Jenkinsfile', 'Jenkinsfile')
      rename('_Makefile', 'Makefile')

      done()
    },

    initGit() {
      if (!this.tpl.confirm) { return }

      const done = this.async()
      gitInit(this.tpl, this.spawnCommandSync)
      done()
    },

    goPlay() {
      if (!this.tpl.confirm) {
        console.log(chalk.yellow.bold(`Bailing out on '${this.tpl.projectName}' due to user input`))
      } else {
        console.log(chalk.blue.bold('All set to go! (pun intended)'))
        console.log(chalk.cyan.bold('You earned yourself a break – maybe go for some coffee, or duel?'))
      }
      coffeeFencing()
    },
  },
})
