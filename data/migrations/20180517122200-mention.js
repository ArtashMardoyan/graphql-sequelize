'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('mention', {
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
            commentId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'comment',
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
    },

    async down(queryInterface) {
        return queryInterface.dropTable('mention');
    }
};
