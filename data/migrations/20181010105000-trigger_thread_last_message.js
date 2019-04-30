'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(
            `
            CREATE OR REPLACE FUNCTION trigger_thread_last_message()
              RETURNS TRIGGER AS $BODY$
            BEGIN
              UPDATE "thread" SET "lastMessageId" = NEW."id" WHERE "id" = NEW."threadId";
            
              INSERT INTO "messageRecipient" ("id", "threadId", "messageId", "userId", "isRead", "isSeen", "createdAt", "updatedAt")
              SELECT uuid_generate_v4(),
                     NEW."threadId",
                     NEW."id",
                     "threadUser"."userId",
                     case
                       when "threadUser"."userId" = NEW."userId" then true
                       else false END,
                     case
                       when "threadUser"."userId" = NEW."userId" then true
                       else false END,
                     NOW(),
                     NOW()
              FROM "threadUser"
              WHERE "threadId" = NEW."threadId";
            
              RETURN NEW;
            END;
            $BODY$
            LANGUAGE plpgsql;
            
            CREATE TRIGGER trigger_thread_last_message
              AFTER INSERT
              ON "message"
              FOR EACH ROW EXECUTE PROCEDURE trigger_thread_last_message();      
            `
        );
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_thread_last_message ON "message"');
    }
};
