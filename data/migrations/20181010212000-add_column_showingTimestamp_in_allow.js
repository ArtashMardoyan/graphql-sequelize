'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('allow', 'showingTimestamp', {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        });
    },

    async down(queryInterface) {}
};
