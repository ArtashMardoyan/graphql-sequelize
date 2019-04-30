'use strict';

const { MediaType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('mediaType', {
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
            'mediaType',
            Object.entries(MediaType).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('mediaType');
    }
};
