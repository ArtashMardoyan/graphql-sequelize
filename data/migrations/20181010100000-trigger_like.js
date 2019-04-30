'use strict';

const { TrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_like()
              RETURNS TRIGGER
            AS
            $BODY$
            DECLARE
              rootId uuid;
            BEGIN
              IF NEW."bookId" IS NOT NULL
              THEN
                UPDATE book
                SET "likesCount" = "likesCount" + 1,
                    "trendPoint" = "trendPoint" + ${TrendPoint.LIKE}
                WHERE id = NEW."bookId";
              ELSIF NEW."publicationId" IS NOT NULL
              THEN
                UPDATE publication
                SET "likesCount" = "likesCount" + 1,
                    "trendPoint" = "trendPoint" + ${TrendPoint.LIKE}
                WHERE id = NEW."publicationId";
                rootId := (SELECT "rootId"
                           FROM "publication"
                           WHERE "id" = NEW."publicationId");
                if rootId :: text != NEW."publicationId" :: text
                  AND (SELECT "userId"
                       FROM "like"
                       WHERE "publicationId" = rootId
                         AND "userId" = NEW."userId") IS NULL
                THEN
                  INSERT INTO "like"
                    ("id", "userId", "publicationId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), NEW."userId", rootId, now(), now());
                END IF;
                return null;
              END IF;
              return null;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_like
              AFTER INSERT
              ON "like"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_like();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_like ON "like"');
    }
};
