'use strict';

const { PublicationType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('publicationType', {
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
            'publicationType',
            Object.entries(PublicationType).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('publicationType');
    }
};
