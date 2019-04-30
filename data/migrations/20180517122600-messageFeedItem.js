'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('messageFeedItem', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'feedType',
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('messageFeedItem');
    }
};
