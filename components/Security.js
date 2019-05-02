'use strict';

const _ = require('lodash');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const stream = require('stream');
const randomString = require('randomstring');

class Security {
    /**
     * @param options
     */
    static generateRandomString(options = 32) {
        return randomString.generate(options);
    }

    /**
     * return integer
     */
    static generateRandomNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    /**
     * @param password
     * @param options
     * @return {Promise<*>}
     */
    static generatePasswordHash(password, options = 10) {
        return bcrypt.hash(password, options);
    }

    /**
     * @param password
     * @param hash
     * @return {Promise<*>}
     */
    static validatePassword(password, hash) {
        return hash && bcrypt.compare(password, hash);
    }

    /**
     * @return {*}
     */
    static generateUuid() {
        return uuid();
    }

    /**
     * @param json
     * @return {*}
     */
    static jsonParser(json) {
        try {
            return _.isString(json) ? JSON.parse(json) : json;
        } catch (ex) {}

        return {};
    }

    /**
     * @param obj
     * @return Boolean
     */
    static isReadableStream(obj) {
        return (
            obj instanceof stream.Stream &&
            typeof (obj._read === 'function') &&
            typeof (obj._readableState === 'object')
        );
    }
}

module.exports = Security;
