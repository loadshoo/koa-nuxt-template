const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');    // 引用mongoose模块
const config = require('../config')
const { logger } = require('../middlewares/logger')

const url = "mongodb://" + config.mongoDB.host + ":" + config.mongoDB.port + "/" + config.mongoDB.database;
const mongo = mongoose.createConnection(url); // 创建一个数据库连接

const db = {
    mongoose,
    mongo,
    models: {}
};
// 错误
mongo.on('error', function (err) {
    logger.error(new Error(err));
});
// 开启
mongo.once('open', function () {
    logger.info("mongo is opened");
});
// 整合models文件下的其他js文件
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    }).forEach(function (file) {
    const modelFile = require(path.join(__dirname, file));
    const schema = new mongoose.Schema(modelFile.schema);

    db.models[modelFile.name] = mongo.model(modelFile.name, schema, modelFile.name);
});
// 根据name选择model
db.getModel = function (name) {
    return this.models[name];
};

module.exports = db;
