const _s = require('underscore.string')
const { defaults, getDefaults } = require('./defaults')
const validate = require('./validate')
const superb = require('superb')

// Generic functions
const input = (name = 'input', message = 'Type in value', _default, _filter, _validate) => ({
  name,
  message,
  default: _default || '',
  filter: _filter || ((x) => x),
  validate: _validate || (() => true),
  type: 'input',
})

const confirm = (name = 'confirm', message = 'Message missing!', defaultValue = false) => ({
  name,
  message,
  defaultValue: !!defaultValue,
  type: 'confirm',
})

const list = (name = 'list', message = 'Choose from list', choices = [], _default) => ({
  name,
  message,
  choices,
  default: _default || (choices[0] || ''),
  type: 'list',
})

// Custom premade
const gitRepo = (_default = defaults.repoName, prefix = 'Icelandair/') => (
  input(
    'gitRepo',
    `Name of ${superb()} git repository? ${prefix}**`,
    _default,
    (x) => (x.indexOf(prefix) !== 0 ? `${prefix}${x}` : x),
    (x) => validate.required(x, 'You have to set a gitRepo')
  )
)

const projectName = (_default) => (
  input(
    'projectName',
    `What's the name of your ${superb()} project?`,
    getDefaults(_default).projectName,
    (x) => _s.slugify(x),
    (x) => validate.dns(x)
  )
)

const type = (_default) => list('type', 'Project type', defaults.types, getDefaults(_default).type)

const tier = (_default) => list('tier', 'Project tier', defaults.tiers, _default || defaults.tier)


const replicaCount = (_default = 2) => (
  input(
    'replicaCount',
    `How many ${superb()} replicas would you like?`,
    _default,
    (x) => validate.number(x)
  )
)

const containerPort = (_default = 10000) => (
  input(
    'containerPort',
    'What port should the container use?',
    _default,
    (x) => validate.port(x)
  )
)

const projectDescription = (_default = 'Raison d\'être') => (
  input(
    'projectDescription',
    'What is this the point of this?',
    _default,
    (x) => validate.required(x)
  )
)

module.exports = {
  input,
  confirm,
  list,

  gitRepo,
  projectName,
  type,
  tier,
  replicaCount,
  containerPort,
  projectDescription,
}
