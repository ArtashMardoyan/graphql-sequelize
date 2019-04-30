'use strict';

const { UserTrendPoint } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_decrement_viewer_count()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              UPDATE "user"
              SET "trendPoint" = "trendPoint" - ${UserTrendPoint.VIEWER}
              WHERE id = OLD."userId";
              RETURN NULL;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_decrement_viewer_count
              AFTER DELETE 
              ON "view"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_decrement_viewer_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_decrement_viewer_count ON "view"');
    }
};
