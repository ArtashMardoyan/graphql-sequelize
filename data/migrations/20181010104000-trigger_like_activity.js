'use strict';

const { ActivityLogType } = require('../lcp');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_like_activity()
                RETURNS TRIGGER
            AS
            $BODY$
            DECLARE
                receiverId uuid;
            BEGIN
                IF NEW."bookId" IS NOT NULL
                THEN
                    receiverId := (SELECT "book"."userId"
                                   FROM "book"
                                   WHERE "book"."id" = NEW."bookId");
            
                    IF receiverId :: text = NEW."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    INSERT INTO "activityLog"
                    (id, "typeId", "bookId", "senderId", "receiverId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), ${
                        ActivityLogType.BOOK_LIKE
                    }, NEW."bookId", NEW."userId", receiverId, now(), now());
                    RETURN NULL;
                END IF;
            
                if NEW."publicationId" IS NOT NULL
                then
                    receiverId := (SELECT "publication"."userId"
                                   from "publication"
                                   where "publication"."id" = NEW."publicationId");
            
                    IF receiverId :: text = NEW."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    INSERT INTO "activityLog"
                    (id, "typeId", "publicationId", "senderId", "receiverId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), ${
                        ActivityLogType.PUBLICATION_LIKE
                    }, NEW."publicationId", NEW."userId", receiverId, now(), now());
                    RETURN NULL;
                END IF;
            
                RETURN NULL;
            END;
            $BODY$
                LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_like_activity
                AFTER INSERT
                ON "like"
                FOR EACH ROW
            EXECUTE PROCEDURE trigger_like_activity();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_like_activity ON "like"');
    }
};
