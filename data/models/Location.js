'use strict';

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        'Location',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            city: {
                type: DataTypes.STRING
            },
            country: {
                type: DataTypes.STRING
            },
            latitude: {
                type: DataTypes.DECIMAL(9, 6)
            },
            longitude: {
                type: DataTypes.DECIMAL(9, 6)
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
