'use strict';

const { ActivityLogType } = require('../lcp');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_unlike_activity()
                RETURNS TRIGGER
            AS
            $BODY$
            DECLARE
                receiverId uuid;
            BEGIN
                IF OLD."bookId" IS NOT NULL
                THEN
                    receiverId := (SELECT "book"."userId"
                                   from "book"
                                   where "book"."id" = OLD."bookId");
            
                    IF receiverId :: text = OLD."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    DELETE
                    FROM "activityLog"
                    WHERE "receiverId" = receiverId
                      AND "senderId" = OLD."userId"
                      AND "bookId" = OLD."bookId"
                      AND "typeId" = ${ActivityLogType.BOOK_LIKE};
                    RETURN NULL;
                END IF;
            
                IF OLD."publicationId" IS NOT NULL
                THEN
                    receiverId := (SELECT "publication"."userId"
                                   FROM "publication"
                                   WHERE "publication"."id" = OLD."publicationId");
            
                    IF receiverId :: text = OLD."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
                    DELETE
                    FROM "activityLog"
                    WHERE "receiverId" = receiverId
                      AND "senderId" = OLD."userId"
                      AND "publicationId" = OLD."publicationId"
                      AND "activityLog"."typeId" = ${ActivityLogType.PUBLICATION_LIKE};
                    RETURN NULL;
                END IF;
                RETURN NULL;
            END;
            $BODY$
                LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_unlike_activity
                AFTER DELETE
                ON "like"
                FOR EACH ROW
            EXECUTE PROCEDURE trigger_unlike_activity();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_unlike_activity ON "like"');
    }
};
