'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('location', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            userId: {
                unique: true,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            city: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            latitude: {
                type: Sequelize.DECIMAL(9, 6)
            },
            longitude: {
                type: Sequelize.DECIMAL(9, 6)
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
        return queryInterface.dropTable('location');
    }
};
