'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('userToken', {
            token: {
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
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userTokenType',
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

        await queryInterface.addIndex('userToken', {
            unique: true,
            fields: ['userId', 'typeId']
        });

        await queryInterface.addIndex('userToken', ['token', 'createdAt', 'updatedAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('userToken');
    }
};
