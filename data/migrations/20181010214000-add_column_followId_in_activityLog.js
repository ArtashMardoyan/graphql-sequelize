'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('activityLog', 'followId', {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
                model: 'userFollow',
                key: 'id'
            }
        });
    },

    async down(queryInterface) {}
};
