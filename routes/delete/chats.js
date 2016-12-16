const Boom = require('boom');

/**
 * @api {delete} /chats Delete a message by the specified property: value
 * @apiName DeleteChat
 * @apiGroup Chats
 * @apiDescription Delete a message from the chat log
 * 
 * @apiParam {number}   id      Message ID to delete
 * @apiParam {string}   from    Delete all messages from this user
 * @apiParam {string}   message Delete all messages when this text
 */
module.exports = {
    handler(request, reply, state) {
        if (!request.payload || Object.keys(request.payload).length === 0) reply(Boom.badRequest('Must specify at least one property'));

        state.chatlog.remove(request.payload);
        reply();
    }
};
