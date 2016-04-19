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

const _defaults = (cwd) => {
  const defaultRepoName = cwd.split('/').pop()
  let defaultProjectName = defaultRepoName
  let defaultType = _defaultType
  if (defaultProjectName.indexOf('.') !== -1) {
    const split = defaultProjectName.split('.')

    if (_types.indexOf(split[0]) !== -1) {
      defaultType = split[0]
      split.shift()
      defaultProjectName = split.join('.')
    }
  }

  const generators = _getGenerators()

  return {
    types: _types,
    tiers: _tiers,
    type: defaultType,
    tier: _defaultTier,
    repoName: defaultRepoName,
    projectName: defaultProjectName,
    generator: generators[0],
    generators,
  }
}

export default _defaults(process.cwd())
