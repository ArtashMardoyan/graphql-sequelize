'use strict';

const { UserTrendPoint } = require('../../constants');
const { RequestStatus } = require('../lcp');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_increment_connection_count()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              IF NEW."statusId" = ${RequestStatus.ACCEPTED}
              THEN
                UPDATE "user"
                SET "trendPoint" = "trendPoint" + ${UserTrendPoint.FOLLOWER}
                WHERE id = NEW."senderId"
                   or id = NEW."receiverId";
                RETURN NULL;
              END IF;
            
              RETURN NULL;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_increment_connection_count
              AFTER INSERT OR UPDATE
              ON "userConnect"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_increment_connection_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query(
            'DROP TRIGGER IF EXISTS trigger_increment_connection_count ON "userConnect"'
        );
    }
};
