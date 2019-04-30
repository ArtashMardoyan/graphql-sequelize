'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('thread', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'threadType',
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

        await queryInterface.addIndex('thread', ['updatedAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('thread');
    }
};
