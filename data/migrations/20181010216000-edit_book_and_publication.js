'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `alter table book
                  alter column description type text using description::text;`
        );

        await queryInterface.sequelize.query(
            `alter table publication
                  alter column description type text using description::text;`
        );

        await queryInterface.sequelize.query(
            `alter table publication
                  alter column text type text using description::text;`
        );
    },

    async down(queryInterface) {}
};
