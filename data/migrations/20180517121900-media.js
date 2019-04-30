'use strict';

const { MediaType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('media', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            bookId: {
                unique: true,
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
            commentId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'comment',
                    key: 'id'
                }
            },
            messageId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'message',
                    key: 'id'
                }
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                defaultValue: MediaType.IMAGE,
                references: {
                    model: 'mediaType',
                    key: 'id'
                }
            },
            data: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            thumbnail: {
                type: Sequelize.STRING(250)
            },
            meta: {
                type: Sequelize.JSON
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
        return queryInterface.dropTable('media');
    }
};
