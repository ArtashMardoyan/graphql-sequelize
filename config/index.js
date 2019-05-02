'use strict';

require('dotenv').config();
const path = require('path');
const config = require('nconf');

config.argv().env();

const defaults = {
    NODE_ENV: 'local',
    db: {
        host: config.get('RDS_HOST'),
        database: config.get('RDS_DB'),
        dialect: config.get('RDS_DIALECT'),
        username: config.get('RDS_USERNAME'),
        password: config.get('RDS_PASSWORD'),
        logging: JSON.parse(config.get('RDS_LOGGING'))
    }
};

let appMode = config.get('NODE_ENV') || defaults.NODE_ENV;

config.file({ file: path.join(__dirname, appMode, 'main.json') });
config.add('common', { type: 'file', file: path.join(__dirname, 'common', 'main.json') });

config.set('params', {
    ...require(path.join(__dirname, 'common', 'params')),
    ...require(path.join(__dirname, appMode, 'params'))
});

config.defaults(defaults);

module.exports = config;
