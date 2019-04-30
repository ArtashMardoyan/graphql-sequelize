'use strict';

const _ = require('lodash');
const faker = require('faker');

module.exports = {
    async up(queryInterface) {
        const userUUID = _.template('cf5ef2e7-b7da-41f9-af53-6ebc15a4ee<%= index %>');

        const users = [];
        const locations = [];

        for (let i = 1; i <= 50; i++) {
            let createdAt = new Date();
            let updatedAt = new Date();
            const email = `test-${i}@mailinator.com`;
            const lastName = faker.name.lastName();
            const firstName = faker.name.firstName();
            const username = `${firstName}_${lastName}`;
            const userId = userUUID({ index: i < 10 ? `0${i}` : i });

            createdAt.setHours(createdAt.getHours() - i * 3);
            updatedAt.setHours(updatedAt.getHours() - i * 3);

            users.push({
                id: userId,
                email,
                username,
                lastName,
                firstName,
                createdAt,
                updatedAt,
                password: 'hunter' // hunter
            });

            locations.push({
                userId,
                createdAt,
                updatedAt,
                id: Security.generateUuid(),
                country: faker.address.country(),
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
            });

            controlSettings.push({
                id: Security.generateUuid(),
                userId,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
        }

        await queryInterface.bulkInsert('user', users, {});

        await Promise.all([
            queryInterface.bulkInsert('allow', allow, {}),
            queryInterface.bulkInsert('media', medias, {}),
            queryInterface.bulkInsert('location', locations, {}),
            queryInterface.bulkInsert('controlSettings', controlSettings, {})
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user');
    }
};
