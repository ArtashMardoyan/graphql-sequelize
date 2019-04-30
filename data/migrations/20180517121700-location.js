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
            bookId: {
                unique: true,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'book',
                    key: 'id'
                }
            },
            publicationId: {
                unique: true,
                onDelete: 'CASCADE',
                type: Sequelize.UUID,
                references: {
                    model: 'publication',
                    key: 'id'
                }
            },
            country: {
                type: Sequelize.STRING
            },
            googleId: {
                type: Sequelize.STRING
            },
            address: {
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
