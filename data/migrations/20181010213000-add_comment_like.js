'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('comment', 'likesCount', {
            defaultValue: 0,
            type: Sequelize.INTEGER
        });

        await queryInterface.addColumn('like', 'commentId', {
            onDelete: 'CASCADE',
            type: Sequelize.UUID,
            references: {
                model: 'comment',
                key: 'id'
            }
        });

        await queryInterface.addColumn('activityLog', 'commentId', {
            onDelete: 'CASCADE',
            type: Sequelize.UUID,
            references: {
                model: 'comment',
                key: 'id'
            }
        });

        await queryInterface.addColumn('activityLog', 'feedTypeId', {
            onDelete: 'CASCADE',
            type: Sequelize.SMALLINT,
            references: {
                model: 'feedType',
                key: 'id'
            }
        });
    },

    async down(queryInterface) {}
};
