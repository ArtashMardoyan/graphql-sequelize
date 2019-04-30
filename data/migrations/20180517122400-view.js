'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('view', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            viewerId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
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
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
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

        await queryInterface.addIndex('view', {
            unique: true,
            fields: ['viewerId', 'userId']
        });

        await queryInterface.addIndex('view', {
            unique: true,
            fields: ['viewerId', 'bookId']
        });

        await queryInterface.addIndex('view', {
            unique: true,
            fields: ['viewerId', 'publicationId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('view');
    }
};
