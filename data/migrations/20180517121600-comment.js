'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comment', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            replyId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'comment',
                    key: 'id'
                }
            },
            userId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
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
            message: {
                type: Sequelize.TEXT
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

        await queryInterface.addIndex('comment', ['message', 'createdAt', 'updatedAt']);
    },

    async down(queryInterface) {
        return queryInterface.dropTable('comment');
    }
};
