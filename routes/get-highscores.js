/* jslint node: true */
const joi = require('joi');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/api/highscore',
        handler: function (request, reply) {
            reply(state.highscores.scores);
        },
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};