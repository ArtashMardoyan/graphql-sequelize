'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('threadUser', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            threadId: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'thread',
                    key: 'id'
                }
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            seeFrom: {
                allowNull: false,
                type: Sequelize.DATE
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

        await queryInterface.addIndex('threadUser', {
            unique: true,
            fields: ['threadId', 'userId']
        });

        await queryInterface.addIndex('threadUser', ['updatedAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('threadUser');
    }
};
