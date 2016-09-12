const fs = require('fs')
const path = require('path')
const _s = require('underscore.string')

const _defaultType = 'micro'
const _types = [
  'micro',
  'domain',
  'vendor',
  'web',
]
const _defaultTier = 'internal'
const _tiers = [
  'backend',
  'internal',
  'frontend',
]
const _getGenerators = () => {
  const projectTypes = []

  fs.readdirSync(path.resolve(__dirname, '../')).filter((file) => {
    if (file !== 'app' && file.indexOf('_') !== 0 && fs.statSync(path.resolve(__dirname, '../', file)).isDirectory()) {
      projectTypes.push(_s.humanize(file))
    }
    return fs.statSync(path.resolve(__dirname, '../', file)).isDirectory() ? file : false
  })

  return projectTypes
}

const _parseNameAndType = (name) => {
  let pName = name
  let pType = _defaultType
  if (pName.indexOf('.') !== -1) {
    const split = pName.split('.')

    if (_types.indexOf(split[0]) !== -1) {
      pType = split[0]
      split.shift()
      pName = split.join('.')
    }
  }

  if (pName.indexOf('mozaik-ext-') === 0) {
    pName = pName.split('-ext-').pop()
  }

  return [pName, pType]
}

const getDefaults = (gitRepo) => {
  const defaultRepoName = (gitRepo || process.cwd()).split('/').pop()

  const [defaultProjectName, defaultType] = _parseNameAndType(defaultRepoName)

  const generators = _getGenerators()

  return {
    types: _types,
    type: defaultType,

    tiers: _tiers,
    tier: _defaultTier,

    generator: generators[0],
    generators,

    repoName: defaultRepoName,
    projectName: defaultProjectName,
  }
}

const defaults = getDefaults()

module.exports = {
  getDefaults,
  defaults,
}
