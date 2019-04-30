'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('controlSettings', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                unique: true,
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            isMessageEnabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            isCommentEnabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            isLikeEnabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            isRequestEnabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('controlSettings');
    }
};
