#!/usr/bin/env node
const meow = require('meow')
const <%= camelProjectName %> = require('./')

const cli = meow([
  'Usage',
  '  $ <%= projectName %> [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ <%= projectName %>',
  '  unicorns & rainbows',
  '  $ <%= projectName %> ponies',
  '  ponies & rainbows',
])

console.log(<%= camelProjectName %>(cli.input[0] || 'unicorns'))
