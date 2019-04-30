'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('backgroundSound', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            publicationId: {
                unique: true,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            data: {
                type: Sequelize.STRING(250),
                allowNull: false
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
        return queryInterface.dropTable('backgroundSound');
    }
};
