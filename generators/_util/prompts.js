const _s = require('underscore.string')
const { defaults, getDefaults } = require('./defaults')
const validate = require('./validate')

const projectName = (gitRepo) => ({
  name: 'projectName',
  message: 'What do you want to name your project?',
  default: getDefaults(gitRepo).projectName,
  filter: (x) => _s.slugify(x),
  validate: (x) => validate.dns(x),
})

const type = (gitRepo) => ({
  type: 'list',
  name: 'type',
  message: 'Type of project?',
  default: getDefaults(gitRepo).type,
  choices: defaults.types,
})

const tier = {
  type: 'list',
  name: 'tier',
  message: 'Which tier?',
  default: defaults.tier,
  choices: defaults.tiers,
}

const replicaCount = {
  name: 'replicaCount',
  message: 'How many replicas would you like?',
  default: 2,
  validate: (x) => validate.number(x),
}

const containerPort = {
  name: 'containerPort',
  message: 'What port should the container use?',
  default: 10000,
  validate: (x) => validate.port(x),
}

const projectDescription = {
  name: 'projectDescription',
  message: 'What is this project supposed to do?',
  default: 'Raison d\'être',
  validate: (x) => validate.required(x),
}

module.exports = {
  projectName,
  type,
  tier,
  replicaCount,
  containerPort,
  projectDescription,
}
