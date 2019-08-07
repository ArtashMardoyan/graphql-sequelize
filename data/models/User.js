'use strict';

const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            lastName: {
                type: DataTypes.STRING(50),
                validate: { len: [2, 50] }
            },
            firstName: {
                type: DataTypes.STRING(50),
                validate: { len: [2, 50] }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    message: 'email.unique'
                },
                validate: {
                    isEmail: true
                }
            },
            cover: {
                type: DataTypes.STRING
            },
            avatar: {
                type: DataTypes.STRING
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    len: [6]
                }
            }
        },
        {
            tableName: 'user',
            timestamps: true
        }
    );

    User.associate = models => {
        User.hasOne(models.Location, {
            as: 'location',
            foreignKey: 'userId'
        });
    };

    User.addScopes = models => {
        const { locationFields, userFields } = config.get('params:model:attributes');
        const attributes = userFields;
        const include = [
            {
                attributes: locationFields,
                model: models.Location,
                as: 'location'
            }
        ];

        User.addScope('expand', () => {
            return { attributes, include };
        });
    };

    return User;
};
