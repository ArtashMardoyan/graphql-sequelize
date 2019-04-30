'use strict';

const { ActivityLogType } = require('../../data/lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activityLog', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'activityLogType',
                    key: 'id'
                }
            },
            bookId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'book',
                    key: 'id'
                }
            },
            publicationId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            connectionId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'userConnect',
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
            text: {
                type: Sequelize.TEXT
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

        await queryInterface.addIndex('activityLog', {
            unique: true,
            where: { typeId: ActivityLogType.COLLABORATE_WITH_BOOK },
            fields: ['typeId', 'senderId', 'receiverId', 'publicationId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('activityLog');
    }
};
