'use strict'
require('babel-register')

const app = require('./server')

app.listen(process.env.PORT || 3000)
