'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reportAbuse', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'reportAbuseType',
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
            description: {
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

        await queryInterface.addIndex('reportAbuse', {
            unique: true,
            fields: ['userId', 'bookId']
        });

        await queryInterface.addIndex('reportAbuse', {
            unique: true,
            fields: ['userId', 'publicationId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('reportAbuse');
    }
};
