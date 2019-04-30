'use strict';

const { PrivacyType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('privacyAccessUser', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                defaultValue: PrivacyType.VISIBILITY,
                references: {
                    model: 'privacyType',
                    key: 'id'
                }
            },
            privacyId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'privacy',
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
            userId: {
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

        await queryInterface.addIndex('privacyAccessUser', {
            unique: true,
            fields: ['privacyId', 'bookId', 'userId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('privacyAccessUser');
    }
};
