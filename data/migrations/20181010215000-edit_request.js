'use strict';

const { RequestType } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE or replace VIEW request AS
              SELECT "FollowRequest"."id",
                     "FollowRequest"."statusId",
                     ${RequestType.FOLLOW_REQUEST} as "typeId",
                     null                         as "threadId",
                     "FollowRequest"."senderId",
                     "FollowRequest"."receiverId",
                     "FollowRequest"."createdAt",
                     "FollowRequest"."updatedAt"
              FROM "userFollow" AS "FollowRequest"
              UNION
              SELECT "ThreadRequest"."id",
                     "ThreadRequest"."statusId",
                     ${RequestType.THREAD_REQUEST} as "typeId",
                     "ThreadRequest"."threadId",
                     "ThreadRequest"."senderId",
                     "ThreadRequest"."receiverId",
                     "ThreadRequest"."createdAt",
                     "ThreadRequest"."updatedAt"
              FROM "threadRequest" AS "ThreadRequest";    
            `
        );
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(`DROP view  if exists request`);
    }
};
