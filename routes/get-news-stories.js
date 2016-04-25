/* jslint node: true */
const joi = require('joi');
const request = require('request');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/api/news/latest',
        handler: function (req, reply) {
            reply({
                stories: state.news.stories(),
                success: true,
            });
        },
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};