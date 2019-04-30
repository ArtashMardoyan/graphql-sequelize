'use strict';

const { BookStatus } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookStatus', {
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
            'bookStatus',
            Object.entries(BookStatus).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('bookStatus');
    }
};
