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
        const payload = JSON.parse(request.payload);

        if (!payload || Object.keys(payload).length === 0) reply(Boom.badRequest('Must specify at least one property'));

        state.chatlog.remove(payload);
        reply();
    }
};
