'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_set_avatar()
              RETURNS TRIGGER AS $BODY$
            BEGIN
            
              UPDATE "user"
              SET avatar = new.thumbnail
              WHERE "id" = new."userId" AND "avatar" ISNULL;
            
              RETURN null;
            END;
            $BODY$
            LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_set_avatar
              AFTER INSERT
              ON "media"
              FOR EACH ROW EXECUTE PROCEDURE trigger_set_avatar();
            `
        );
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_set_avatar ON "media"');
    }
};
