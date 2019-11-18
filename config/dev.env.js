'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://api.yirisanxian.com"'
  // BASE_API: '"http://39.98.190.128:8080"'
  // BASE_API: '"http://localhost:10020"'
})
