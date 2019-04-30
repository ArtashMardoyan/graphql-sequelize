'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('book', {
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
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'bookStatus',
                    key: 'id'
                }
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'bookType',
                    key: 'id'
                }
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            description: {
                type: Sequelize.STRING(140)
            },
            viewCount: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            likesCount: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            trendPoint: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            commentsCount: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            orderDate: {
                allowNull: false,
                type: Sequelize.DATE
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

        await queryInterface.addIndex('book', ['title', 'createdAt', 'updatedAt']);
    },

    async down(queryInterface) {
        return queryInterface.dropTable('book');
    }
};
