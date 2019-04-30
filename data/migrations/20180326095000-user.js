'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID
            },
            username: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING(50)
            },
            lastName: {
                type: Sequelize.STRING(50)
            },
            bio: {
                type: Sequelize.TEXT
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            phone: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            cover: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATEONLY
            },
            genderId: {
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userGender',
                    key: 'id'
                }
            },
            statusId: {
                allowNull: false,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userStatus',
                    key: 'id'
                }
            },
            privacyId: {
                allowNull: true,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userPrivacy',
                    key: 'id'
                }
            },
            isVerified: {
                allowNull: true,
                onDelete: 'CASCADE',
                type: Sequelize.SMALLINT,
                references: {
                    model: 'verificationStatus',
                    key: 'id'
                }
            },
            stateId: {
                allowNull: false,
                type: Sequelize.SMALLINT,
                references: {
                    model: 'userState',
                    key: 'id'
                }
            },
            trendPoint: {
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            nearbyEnabled: {
                defaultValue: false,
                type: Sequelize.BOOLEAN
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            accessTokenSalt: {
                allowNull: false,
                type: Sequelize.STRING
            },
            emailVerificationCode: {
                type: Sequelize.INTEGER
            },
            phoneVerificationCode: {
                type: Sequelize.INTEGER
            },
            forgotPasswordCode: {
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

        await queryInterface.addIndex('user', ['username', 'firstName', 'lastName', 'createdAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user');
    }
};
