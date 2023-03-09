'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  try {
    if (typeof ctx.request.headers.cookie === 'string') {
      const token = ctx.request.headers.cookie;
      ctx.jwtData = jwt.verify(token, config.secret)
    } else {
      // eslint-disable-next-line no-throw-literal
      throw {
        code: 401,
        message: 'no cookie'
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 401,
      message: err.message
    }
  }
  next()
}
