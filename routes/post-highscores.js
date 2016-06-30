/* jslint node: true */
const joi = require('joi');
const Boom = require('boom');

module.exports = function (state) {
    return {
        method: 'post',
        path: '/api/highscore',
        handler: function (request, reply) {
            var content = request.payload;
            // var content = JSON.parse(request.payload);

            if (content.hasOwnProperty('name') &&
                content.hasOwnProperty('score') &&
                content.hasOwnProperty('playerType')) {

                state.highscores.add(content);
                reply(content);
            } else {
                reply(Boom.badRequest('Must provide a name, score, and playerType'));
            }
        },
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};