'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('userFollow', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'connectStatus',
                    key: 'id'
                }
            },
            senderId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            receiverId: {
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

        await queryInterface.addIndex('userFollow', {
            unique: true,
            fields: ['senderId', 'receiverId']
        });
    },

    async down(queryInterface) {
        return queryInterface.dropTable('userFollow');
    }
};
