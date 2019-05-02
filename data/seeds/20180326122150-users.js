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
                password: 'hunter', // hunter
                cover: faker.image.nature(),
                avatar: faker.image.avatar()
            });

            locations.push({
                userId,
                createdAt,
                updatedAt,
                id: Security.generateUuid(),
                country: faker.address.country(),
                zipCode: faker.address.zipCode(),
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude(),
                address: faker.address.streetAddress()
            });
        }

        await queryInterface.bulkInsert('user', users, {});
        await queryInterface.bulkInsert('location', locations, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user');
    }
};
