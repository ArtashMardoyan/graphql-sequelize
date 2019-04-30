'use strict';

const { ActivityLogType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activityLogType', {
            id: {
                primaryKey: true,
                type: Sequelize.SMALLINT
            },
            label: {
                allowNull: false,
                type: Sequelize.STRING(100)
            }
        });

        await queryInterface.bulkInsert(
            'activityLogType',
            Object.entries(ActivityLogType).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        return queryInterface.dropTable('activityLogType');
    }
};
