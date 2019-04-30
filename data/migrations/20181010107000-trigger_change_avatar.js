'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_change_avatar()
              RETURNS TRIGGER AS $BODY$
            BEGIN
              if OLD."thumbnail" = (SELECT "avatar"
                                    FROM "user"
                                    WHERE "id" = old."userId")
              then
                UPDATE "user"
                SET avatar = (SELECT "thumbnail"
                              FROM "media"
                              WHERE "userId" = old."userId"
                              ORDER BY "createdAt" DESC
                              LIMIT 1)
                WHERE "id" = old."userId";
            
                return null;
              end if;
            
              return null;
            END;
            $BODY$
            LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_change_avatar
              AFTER DELETE
              ON "media"
              FOR EACH ROW EXECUTE PROCEDURE trigger_change_avatar();
            `
        );
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_change_avatar ON "media"');
    }
};
