'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('allow', {
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
            saving: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            sharing: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            reposting: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            commenting: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            forwarding: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            downloading: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            screenshots: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            sharingLink: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        return queryInterface.dropTable('allow');
    }
};
