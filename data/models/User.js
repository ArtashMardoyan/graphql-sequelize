'use strict';

import config from '../../config';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING
        },
        { tableName: 'user', timestamps: true }
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
