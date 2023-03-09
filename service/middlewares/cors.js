'use strict'

const corsHandler = {
    origin: function (ctx) {
        if (ctx.url === '/test') {
            // 这里可以配置不运行跨域的接口地址
            return false;
        }
        return 'http://127.0.0.1:3000';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}


module.exports = {
    corsHandler
}
