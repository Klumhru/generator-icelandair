const yeoman = require('yeoman-generator')
const _s = require('underscore.string')
const superb = require('superb')

const prompts = require('../_util/prompts')
const { defaults } = require('../_util/defaults')
const { required } = require('../_util/validate')

module.exports = yeoman.Base.extend({
  initializing() {
    this.answers = {
      projectType: '',
    }
  },

  prompting: {
    askForProjectType() {
      const done = this.async()

      this.prompt(prompts.list(
        'projectType',
        `What kind of ${superb()} project do you need?`,
        defaults.generators,
        defaults.generator,
        (x) => required(x, 'You have to pick a project type')
      ), (props) => {
        Object.assign(this.answers, {
          projectType: _s.slugify(props.projectType),
        })

        done()
      })
    },
  },

  compose() {
    this.composeWith(`icelandair:${this.answers.projectType}`, {
      options: {
        answers: this.answers,
        nested: true,
      },
    }, {
      local: require.resolve(`./../${this.answers.projectType}`),
    })
  },
})
