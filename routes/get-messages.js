/* jslint node: true */
const joi = require('joi');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/messages',
        handler: function (request, reply) {
            console.log(new Date().toISOString() + '\tGET /messages');
            // Create the options config object.
            var options = {};
            if (request.query.start) options.start = request.query.start;
            return reply(JSON.stringify(state.messages.fetch(options)));
        },
        config: {
            validate: {
                query: {
                    start: joi.number().integer(),
                },
            },
            cors: {
                origin: ['*'],
            },
        },
    };
};