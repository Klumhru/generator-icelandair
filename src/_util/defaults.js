import fs from 'fs'
import path from 'path'
import _s from 'underscore.string'

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

  return [pName, pType]
}

export const getDefaults = (gitRepo) => {
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

export const defaults = getDefaults()
