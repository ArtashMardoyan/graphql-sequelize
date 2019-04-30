'use strict';

const { ContentType } = require('../../data/lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('publication', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            typeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'publicationType',
                    key: 'id'
                }
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
            bookId: {
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'book',
                    key: 'id'
                }
            },
            rootId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'publicationStatus',
                    key: 'id'
                }
            },
            parentId: {
                onDelete: 'SET NULL',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            contentTypeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                defaultValue: ContentType.OWN,
                references: {
                    model: 'contentType',
                    as: 'id'
                }
            },
            description: {
                type: Sequelize.STRING(140)
            },
            text: {
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

        await queryInterface.addIndex('publication', ['description', 'createdAt', 'updatedAt']);
    },

    async down(queryInterface) {
        return queryInterface.dropTable('publication');
    }
};
