import _s from 'underscore.string'
import { defaults, getDefaults } from './defaults'
import * as validate from './validate'

export const projectName = (gitRepo) => {
  return {
    name: 'projectName',
    message: 'What do you want to name your project?',
    default: getDefaults(gitRepo).projectName,
    filter: (x) => _s.slugify(x),
    validate: (x) => validate.dns(x),
  }
}

export const type = (gitRepo) => {
  return {
    type: 'list',
    name: 'type',
    message: 'Type of project?',
    default: getDefaults(gitRepo).type,
    choices: defaults.types,
  }
}

export const tier = {
  type: 'list',
  name: 'tier',
  message: 'Which tier?',
  default: defaults.tier,
  choices: defaults.tiers,
}

export const replicaCount = {
  name: 'replicaCount',
  message: 'How many replicas would you like?',
  default: 2,
  validate: (x) => validate.number(x),
}

export const containerPort = {
  name: 'containerPort',
  message: 'What port should the container use?',
  default: 10000,
  validate: (x) => validate.port(x),
}

export const projectDescription = {
  name: 'projectDescription',
  message: 'What is this project supposed to do?',
  default: 'Raison d\'être',
  validate: (x) => validate.required(x),
}
