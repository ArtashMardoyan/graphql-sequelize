'use strict';

const { RequestStatus } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('connectStatus', {
            id: {
                primaryKey: true,
                type: Sequelize.SMALLINT
            },
            label: {
                allowNull: false,
                type: Sequelize.STRING(100)
            }
        });

        return queryInterface.bulkInsert(
            'connectStatus',
            Object.entries(RequestStatus).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        return queryInterface.dropTable('connectStatus');
    }
};
