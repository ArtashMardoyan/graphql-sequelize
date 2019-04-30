'use strict';

const { RequestType } = require('../../constants');

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE or replace VIEW request AS
              SELECT "ConnectionRequest"."id",
                     "ConnectionRequest"."statusId",
                     ${RequestType.FOLLOW_REQUEST} as "typeId",
                     null as "threadId",
                     "ConnectionRequest"."senderId",
                     "ConnectionRequest"."receiverId",
                     "ConnectionRequest"."createdAt",
                     "ConnectionRequest"."updatedAt"
              FROM "userConnect" AS "ConnectionRequest"
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
