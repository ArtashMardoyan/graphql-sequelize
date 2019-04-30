'use strict';

const { BOOK_LIKE, COMMENT_LIKE, PUBLICATION_LIKE } = require('../lcp/ActivityLogType');
const { BOOK, PUBLICATION } = require('../lcp/FeedType');

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_like_activity()
                RETURNS TRIGGER
            AS
            $BODY$
            DECLARE
                feedTypeId    smallint;
                publicationId uuid;
                receiverId    uuid;
                bookId        uuid;
            BEGIN
                IF NEW."bookId" IS NOT NULL
                THEN
                    receiverId := (SELECT "userId" FROM "book" WHERE "id" = NEW."bookId");
            
                    IF receiverId :: text = NEW."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    INSERT INTO "activityLog"
                    (id, "typeId", "bookId", "senderId", "receiverId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), ${BOOK_LIKE}, NEW."bookId", NEW."userId", receiverId, now(), now());
                END IF;
            
                IF NEW."commentId" IS NOT NULL
                THEN
                    publicationId := (SELECT "publicationId" FROM "comment" WHERE "id" = NEW."commentId");
                    receiverId := (SELECT "userId" FROM "comment" WHERE "id" = NEW."commentId");
                    bookId := (SELECT "bookId" FROM "comment" WHERE "id" = NEW."commentId");
            
                    feedTypeId = (CASE WHEN bookId ISNULL THEN ${PUBLICATION} ELSE ${BOOK} END);
            
                    IF receiverId :: text = NEW."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    INSERT INTO "activityLog"
                    (id, "typeId", "commentId", "senderId", "receiverId", "bookId", "publicationId", "feedTypeId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), ${COMMENT_LIKE}, NEW."commentId", NEW."userId", receiverId, bookId, publicationId, feedTypeId, now(), now());
                END IF;
            
                IF NEW."publicationId" IS NOT NULL
                then
                    receiverId := (SELECT "userId" FROM "publication" WHERE "id" = NEW."publicationId");
            
                    IF receiverId :: text = NEW."userId" :: text
                    THEN
                        RETURN NULL;
                    END IF;
            
                    INSERT INTO "activityLog"
                    (id, "typeId", "publicationId", "senderId", "receiverId", "createdAt", "updatedAt")
                    VALUES (uuid_generate_v4(), ${PUBLICATION_LIKE}, NEW."publicationId", NEW."userId", receiverId, now(), now());
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
