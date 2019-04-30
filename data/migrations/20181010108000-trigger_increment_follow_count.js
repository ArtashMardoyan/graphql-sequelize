'use strict';

const { FOLLOWER } = require('../../constants/UserTrendPoint');
const { ACCEPTED } = require('../lcp/RequestStatus');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_increment_follow_count()
                RETURNS TRIGGER
            AS
            $BODY$
            BEGIN
                IF NEW."statusId" = ${ACCEPTED}
                THEN
                    UPDATE "user"
                    SET "trendPoint" = "trendPoint" + ${FOLLOWER}
                    WHERE  id = NEW."receiverId";
                    RETURN NULL;
                END IF;
            
                RETURN NULL;
            END;
            $BODY$
                LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_increment_follow_count
                AFTER INSERT OR UPDATE
                ON "userFollow"
                FOR EACH ROW
            EXECUTE PROCEDURE trigger_increment_follow_count();
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query(
            'DROP TRIGGER IF EXISTS trigger_increment_follow_count ON "userFollow"'
        );
    }
};
