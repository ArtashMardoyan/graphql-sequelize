'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('threadRequest', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'connectStatus',
                    key: 'id'
                }
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
            senderId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            receiverId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
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

        await queryInterface.addIndex('threadRequest', ['updatedAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('threadRequest');
    }
};
