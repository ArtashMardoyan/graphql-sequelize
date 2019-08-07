'use strict';

const _ = require('lodash');
const faker = require('faker');

const Security = require('../../components/Security');

module.exports = {
    async up(queryInterface) {
        const userUUID = _.template('cf5ef2e7-b7da-41f9-af53-6ebc15a4ee<%= index %>');

        const users = [];
        const locations = [];

        for (let i = 1; i <= 50; i++) {
            const userId = userUUID({ index: i < 10 ? `0${i}` : i });

            users.push({
                id: userId,
                lastName: faker.name.lastName(),
                firstName: faker.name.firstName(),
                email: `test-${i}@mailinator.com`,
                password: 'hunter', // hunter
                cover: faker.image.nature(),
                avatar: faker.image.avatar(),
                createdAt: new Date(),
                updatedAt: new Date()
            });

            locations.push({
                id: Security.generateUuid(),
                userId,
                city: faker.address.city(),
                country: faker.address.country(),
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('user', users, {});
        await queryInterface.bulkInsert('location', locations, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user');
    }
};
