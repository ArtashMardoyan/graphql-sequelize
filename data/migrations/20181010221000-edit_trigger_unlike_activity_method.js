'use strict';

const { BOOK_LIKE, COMMENT_LIKE, PUBLICATION_LIKE } = require('../lcp/ActivityLogType');

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
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
                    receiverId := (SELECT "userId" FROM "book" WHERE "id" = OLD."bookId");
            
                    IF receiverId :: text = OLD."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    DELETE
                    FROM "activityLog"
                    WHERE "receiverId" = receiverId
                      AND "senderId" = OLD."userId"
                      AND "bookId" = OLD."bookId"
                      AND "typeId" = ${BOOK_LIKE};
                    RETURN NULL;
                END IF;
            
                IF OLD."commentId" IS NOT NULL
                THEN
                    receiverId := (SELECT "userId" FROM "comment" WHERE "id" = OLD."commentId");
            
                    IF receiverId :: text = OLD."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    DELETE
                    FROM "activityLog"
                    WHERE "receiverId" = receiverId
                      AND "senderId" = OLD."userId"
                      AND "commentId" = OLD."commentId"
                      AND "typeId" = ${COMMENT_LIKE};
                    RETURN NULL;
                END IF;
            
                IF OLD."publicationId" IS NOT NULL
                THEN
                    receiverId := (SELECT "userId" FROM "publication" WHERE "id" = OLD."publicationId");
            
                    IF receiverId :: text = OLD."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
                    DELETE
                    FROM "activityLog"
                    WHERE "receiverId" = receiverId
                      AND "senderId" = OLD."userId"
                      AND "publicationId" = OLD."publicationId"
                      AND "activityLog"."typeId" = ${PUBLICATION_LIKE};
                    RETURN NULL;
                END IF;
                RETURN NULL;
            END;
            $BODY$
                LANGUAGE plpgsql;
          `
        );
    },

    async down(queryInterface) {}
};
