'use strict';

const { UserTrendPoint } = require('../../constants');
const { RequestStatus } = require('../lcp');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
           CREATE OR REPLACE FUNCTION trigger_decrement_connection_count()
              RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
              IF OLD."statusId" = ${RequestStatus.ACCEPTED}
              THEN
                UPDATE "user"
                SET "trendPoint" = "trendPoint" - ${UserTrendPoint.FOLLOWER}
                WHERE id = OLD."senderId"
                   or id = OLD."receiverId";
                RETURN NULL;
              END IF;
            
              RETURN NULL;
            END;
            $BODY$
              LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_decrement_connection_count
              AFTER DELETE
              ON "userConnect"
              FOR EACH ROW
            EXECUTE PROCEDURE trigger_decrement_connection_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query(
            'DROP TRIGGER IF EXISTS trigger_decrement_connection_count ON "userConnect"'
        );
    }
};
