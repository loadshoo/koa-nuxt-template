'use strict'
const test = {}

test.test = (ctx, next) => {
  ctx.result = ctx.jwtData
  return next()
}

module.exports = test
