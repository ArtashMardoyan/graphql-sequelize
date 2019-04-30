'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('like', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('like', {
            unique: true,
            fields: ['userId', 'bookId']
        });

        await queryInterface.addIndex('like', {
            unique: true,
            fields: ['userId', 'publicationId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('like');
    }
};
