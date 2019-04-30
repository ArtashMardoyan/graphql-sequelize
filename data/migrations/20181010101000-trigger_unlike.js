'use strict';

const { TrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_unlike()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              IF old."bookId" IS NOT NULL
              THEN
                UPDATE book
                SET "likesCount" = "likesCount" - 1,
                    "trendPoint" = "trendPoint" - ${TrendPoint.LIKE}
                WHERE id = OLD."bookId";
              ELSIF OLD."publicationId" IS NOT NULL
              THEN
                UPDATE publication
                SET "likesCount" = "likesCount" - 1,
                    "trendPoint" = "trendPoint" - ${TrendPoint.LIKE}
                WHERE id = OLD."publicationId";
              END IF;
              return null;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_unlike
              AFTER DELETE
              ON "like"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_unlike();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_unlike ON "like"');
    }
};
