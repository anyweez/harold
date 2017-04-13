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
        // request.payload = JSON.parse(request.payload);
        if (!request.payload.title) reply(Boom.badRequest('Must specify a book title'));
        else if (!request.payload.author) reply(Boom.badRequest('Must specify an author'));
        else {
            state.books.add({
                title: request.payload.title,
                author: request.payload.author,
                price: request.payload.price || 1.99,
                cover: request.payload.hasOwnProperty('cover') ? request.payload.cover : null,
            });

            reply({
                chats: state.books.getAll()
            });
        }
    },
};
