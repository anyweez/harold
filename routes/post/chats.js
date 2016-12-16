const Boom = require('boom');

/**
 * @api {post} /chats Record new chat message
 * @apiName PostChat
 * @apiGroup Chats
 * @apiDescription Adds a new message to the global chat log. Messages can be retrieved via the GET /chats
 * endpoint. 
 * 
 * @apiParam {string}   from    User who sent the message
 * @apiParam {string}   message Message content (raw text)
 * @apiSuccess {Array}  chats   All available chat messages
 */
module.exports = {
    handler(request, reply, state) {
        if (!request.payload.from) reply(Boom.badRequest('Must specify a user name'));
        else if (!request.payload.message) reply(Boom.badRequest('Must specify a message'));
        else {
            state.chatlog.add({
                from: request.payload.from,
                message: request.payload.message,
            });

            reply({
                chats: state.chatlog.getAll()
            });
        }
    },
};
