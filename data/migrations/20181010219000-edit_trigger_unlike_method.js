'use strict';

const { TrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_unlike()
                RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
                IF old."bookId" IS NOT NULL
                THEN
                    UPDATE "book"
                    SET "likesCount" = "likesCount" - 1,
                        "trendPoint" = "trendPoint" - ${TrendPoint.LIKE}
                    WHERE id = OLD."bookId";
                ELSIF old."commentId" IS NOT NULL
                THEN
                    UPDATE "comment"
                    SET "likesCount" = "likesCount" - 1
                    WHERE id = OLD."commentId";
                ELSIF OLD."publicationId" IS NOT NULL
                THEN
                    UPDATE "publication"
                    SET "likesCount" = "likesCount" - 1,
                        "trendPoint" = "trendPoint" - ${TrendPoint.LIKE}
                    WHERE id = OLD."publicationId";
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
