const Boom = require('boom');

module.exports = {
    handler(request, reply, state) {
        if (!request.payload.from) reply(Boom.badRequest('Must specify a user name'));
        else if (!request.payload.message) reply(Boom.badRequest('Must specify a message'));
        else {
            state.chatlog.add({
                from: request.payload.from,
                message: request.payload.message,
            });

            reply(state.chatlog.getAll());
        }
    },
};