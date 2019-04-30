'use strict';

const { BookType } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookType', {
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
            'bookType',
            Object.entries(BookType).map(([value, key]) => {
                return { id: key, label: value };
            })
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('bookType');
    }
};
