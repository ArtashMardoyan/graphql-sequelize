'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            username: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING(50)
            },
            lastName: {
                type: Sequelize.STRING(50)
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            cover: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('user', ['username', 'firstName', 'lastName', 'createdAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user');
    }
};
