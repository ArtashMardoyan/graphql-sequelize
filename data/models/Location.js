'use strict';

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        'Location',
        {
            country: {
                type: DataTypes.STRING
            },
            latitude: {
                type: DataTypes.DECIMAL(9, 6)
            },
            longitude: {
                type: DataTypes.DECIMAL(9, 6)
            },
            address: {
                type: DataTypes.STRING
            },
            googleId: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'location',
            timestamps: true
        }
    );

    Location.associate = models => {
        Location.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
    };

    return Location;
};
