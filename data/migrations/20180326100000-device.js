'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('device', {
            token: {
                primaryKey: true,
                type: Sequelize.STRING
            },
            endpointArn: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'deviceType',
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
        await queryInterface.dropTable('device');
    }
};
