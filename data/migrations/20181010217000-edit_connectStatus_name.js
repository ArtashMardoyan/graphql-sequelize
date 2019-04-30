'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(`alter table "connectStatus" rename to "requestStatus";`);
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(`alter table "requestStatus" rename to "connectStatus";`);
    }
};
