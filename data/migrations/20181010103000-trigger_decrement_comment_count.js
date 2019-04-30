'use strict';

const { TrendPoint, UserTrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_decrement_comment_count()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              if OLD."bookId" IS NOT NULL
              THEN
                UPDATE book
                SET "commentsCount" = "commentsCount" - 1,
                    "trendPoint"    = "trendPoint" - ${TrendPoint.COMMENT}
                WHERE id = OLD."bookId";
            
                IF (SELECT COUNT(id)
                    FROM comment
                    WHERE "userId" = OLD."userId"
                      AND "bookId" = OLD."bookId"
                    LIMIT 2) = 0
                THEN
                  UPDATE "user"
                  SET "trendPoint" = "trendPoint" - ${UserTrendPoint.COMMENT}
                  WHERE id = (SELECT "userId"
                              FROM "book"
                              WHERE "id" = OLD."bookId");
                  RETURN NULL;
                END IF;
                RETURN NULL;
              END IF;
            
              if OLD."publicationId" IS NOT NULL
              then
                UPDATE publication
                SET "commentsCount" = "commentsCount" - 1,
                    "trendPoint"    = "trendPoint" - ${TrendPoint.COMMENT}
                WHERE id = OLD."publicationId";
            
                IF (SELECT COUNT(id)
                    FROM comment
                    WHERE "userId" = OLD."userId"
                      AND "publicationId" = OLD."publicationId"
                    LIMIT 2) = 0
                THEN
                  UPDATE "user"
                  SET "trendPoint" = "trendPoint" - ${UserTrendPoint.COMMENT}
                  WHERE id = (SELECT "userId"
                              FROM "publication"
                              WHERE "id" = OLD."publicationId");
                  RETURN NULL;
                END IF;
                RETURN NULL;
              END IF;
            
              RETURN NULL;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_decrement_comment_count
              AFTER DELETE
              ON "comment"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_decrement_comment_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query(
            'DROP TRIGGER IF EXISTS trigger_decrement_comment_count ON "comment"'
        );
    }
};
