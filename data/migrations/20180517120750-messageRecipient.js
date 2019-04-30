'use strict';

const { RecipientStatus } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('messageRecipient', {
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
            messageId: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'message',
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
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                defaultValue: RecipientStatus.PUBLISHED,
                references: {
                    model: 'recipientStatus',
                    key: 'id'
                }
            },
            isSeen: {
                defaultValue: false,
                type: Sequelize.BOOLEAN
            },
            isRead: {
                defaultValue: false,
                type: Sequelize.BOOLEAN
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

        await queryInterface.addIndex('messageRecipient', ['isSeen', 'isRead', 'createdAt', 'updatedAt']);
        await queryInterface.addIndex('messageRecipient', {
            unique: true,
            fields: ['threadId', 'messageId', 'userId']
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('messageRecipient');
    }
};
