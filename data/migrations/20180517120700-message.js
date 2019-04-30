'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('message', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            text: {
                type: Sequelize.TEXT
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'messageType',
                    key: 'id'
                }
            },
            threadId: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'thread',
                    key: 'id'
                }
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            index: {
                type: Sequelize.INTEGER
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

        await queryInterface.addColumn('thread', 'lastMessageId', {
            allowNull: true,
            type: Sequelize.UUID,
            references: {
                model: 'message',
                key: 'id'
            }
        });

        await queryInterface.addIndex('thread', ['lastMessageId']);
        await queryInterface.addIndex('message', ['text', 'createdAt', 'updatedAt']);
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('thread', 'lastMessageId');
        await queryInterface.dropTable('message');
    }
};
