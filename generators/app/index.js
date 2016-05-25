const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const chalk = require('chalk')
const gitInit = require('../_util/git')
const { defaults } = require('../_util/defaults')
const { required } = require('../_util/validate')

let projectType
let gitRepo

module.exports = yeoman.Base.extend({
  prompting() {
    const cb = this.async()

    this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What type of project do you need?',
      default: defaults.generator,
      choices: defaults.generators,
      validate: (x) => required(x, 'You have to pick a project type'),
    }, {
      type: 'input',
      name: 'gitRepo',
      message: 'Name of git repository? Icelandair/**',
      default: defaults.repoName,
      filter: (x) => `Icelandair/${x}`,
      validate: (x) => required(x, 'You have to set a gitRepo'),
    }], (props) => {
      projectType = _s.slugify(props.projectType)
      gitRepo = props.gitRepo

      cb()
    })
  },
  compose() {
    this.composeWith(`icelandair:${projectType}`, {
      options: {
        gitRepo,
        projectType,
        nested: true,
      },
    }, {
      local: require.resolve(`./../${projectType}`),
    }).on('end', () => {
      console.log(
        chalk.bold.cyan('Successfully generated new ') +
        chalk.bold.green(_s.humanize(projectType).toLowerCase())
      )

      gitInit({ gitRepo }, this.spawnCommandSync)
    })
  },
})
