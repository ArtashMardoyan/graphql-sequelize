'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('mediaView', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            ownerId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            publicationId: {
                allowNull: true,
                onDelete: 'SET NULL',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            mediaId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'media',
                    key: 'id'
                }
            },
            mediaMeta: {
                type: Sequelize.JSON
            },
            dob: {
                type: Sequelize.DATEONLY
            },
            genderId: {
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userGender',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('mediaView', {
            unique: true,
            fields: ['userId', 'ownerId', 'publicationId', 'mediaId', 'dob', 'genderId']
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('mediaView');
    }
};
