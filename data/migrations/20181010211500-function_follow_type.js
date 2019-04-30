'use strict';

const { RequestStatus } = require('../../data/lcp');
const { FollowType } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION followType(senderId uuid, receiverId uuid)
              RETURNS SMALLINT
            AS
            $BODY$
            DECLARE
              followTypeId SMALLINT;
              userFollow      "userFollow"%ROWTYPE;
            BEGIN
              followTypeId = 0;
            
              IF senderId != receiverId THEN
                SELECT * INTO userFollow
                FROM "userFollow"
                WHERE ("userFollow"."senderId" = senderId AND "userFollow"."receiverId" = receiverId);
            
                IF userFollow ISNULL THEN
                  followTypeId = ${FollowType.NOT_FOLLOWED};
                ELSEIF userFollow."statusId" = ${RequestStatus.ACCEPTED} THEN
                  followTypeId = ${FollowType.FOLLOWED};
                ELSEIF userFollow."statusId" = ${RequestStatus.PENDING} THEN
                  followTypeId = ${FollowType.PENDING};
                END IF;
            
                RETURN followTypeId;
              END IF;
            
              RETURN followTypeId;
            END;
            $BODY$
              LANGUAGE plpgsql;
            `
        );
    },

    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP FUNCTION IF EXISTS followType(uuid, uuid);');
    }
};
