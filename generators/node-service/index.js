'use strict'
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')


module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async()
    const self = this

    this.prompt([
      {
        name: 'projectName',
        message: 'What do you want to name your project?',
        default: this.appname,
        filter: x => _s.slugify(x),
        // eslint-disable-next-line max-len, no-nested-ternary
        validate: x => x.length === 0 ? 'You have to set a project name' : (x.length > 28 ? 'Must be DNS compliant, max 28 characters' : true),
      },
      {
        type: 'list',
        name: 'type',
        message: 'Type of project (micro/web/etc)?',
        default: 'micro',
        choices: [
          'micro',
          'domain',
          'vendor',
          'web',
        ],
      },
      {
        type: 'list',
        name: 'tier',
        message: 'Which tier?',
        default: 'internal',
        choices: [
          'backend',
          'internal',
          'frontend',
        ],
      },
      {
        name: 'replicaCount',
        message: 'How many replicas would you like?',
        default: 2,
        filter: x => parseInt(x, 10),
        validate: x => x.toString().length > 0 ? true : 'You have to set a replicaCount',
      },
      {
        name: 'containerPort',
        message: 'What port should the container use?',
        default: 10000,
        validate: x => x.toString().length > 0 ? true : 'You have to set a containerPort',
      },
      {
        name: 'projectDescription',
        message: 'What is this project supposed to do?',
        default: 'Raison d\'être',
      },
    ], props => {
      const tpl = {
        projectName: props.projectName,
        camelProjectName: _s.camelize(props.projectName),
        type: props.type,
        tier: props.tier,
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
    console.log('Installing dependencies (relevant xkcd: http://xkcd.com/303/)')
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
