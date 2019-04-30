'use strict';

const { TrendPoint, UserTrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_increment_comment_count()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              IF NEW."bookId" IS NOT NULL
              THEN
                UPDATE book
                SET "commentsCount" = "commentsCount" + 1,
                    "trendPoint"    = "trendPoint" + ${TrendPoint.COMMENT}
                WHERE id = NEW."bookId";
            
                IF (SELECT COUNT(id)
                    FROM comment
                    WHERE "userId" = NEW."userId"
                      AND "bookId" = NEW."bookId"
                    LIMIT 2) = 1
                THEN
                  UPDATE "user"
                  SET "trendPoint" = "trendPoint" + ${UserTrendPoint.COMMENT}
                  WHERE id = (SELECT "userId"
                              FROM "book"
                              WHERE "id" = NEW."bookId");
                  RETURN NULL;
                END IF;
                RETURN NULL;
              END IF;
            
              if NEW."publicationId" IS NOT NULL
              then
                UPDATE publication
                SET "commentsCount" = "commentsCount" + 1,
                    "trendPoint"    = "trendPoint" + ${TrendPoint.COMMENT}
                WHERE id = NEW."publicationId";
            
                IF (SELECT COUNT(id)
                    FROM comment
                    WHERE "userId" = NEW."userId"
                      AND "publicationId" = NEW."publicationId"
                    LIMIT 2) = 1
                THEN
                  UPDATE "user"
                  SET "trendPoint" = "trendPoint" + ${UserTrendPoint.COMMENT}
                  WHERE id = (SELECT "userId"
                              FROM "publication"
                              WHERE "id" = NEW."publicationId");
                  RETURN NULL;
                END IF;
                RETURN NULL;
              END IF;
            
              RETURN NULL;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_increment_comment_count
              AFTER INSERT
              ON "comment"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_increment_comment_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query(
            'DROP TRIGGER IF EXISTS trigger_increment_comment_count ON "comment"'
        );
    }
};
