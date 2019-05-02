'use strict';

const fs = require('fs');
const pg = require('pg');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config');

const basename = path.basename(__filename);
const models = {};

delete pg.native;

const sequelize = new Sequelize(config.get('db:database'), config.get('db:username'), config.get('db:password'), {
    logging: config.get('db:logging') ? console.log : false,
    operatorsAliases: Sequelize.Op.Aliases,
    dialect: config.get('db:dialect'),
    host: config.get('db:host'),
    freezeTableName: true
});

fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }

    if (models[modelName].addScopes) {
        models[modelName].addScopes(models);
    }

    models[modelName].generateNestedQuery = query => {
        return sequelize.literal(
            `(${sequelize
                .getQueryInterface()
                .QueryGenerator.selectQuery(models[modelName].getTableName(), query)
                .slice(0, -1)})`
        );
    };
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
