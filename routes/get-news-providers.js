/* jslint node: true */
const joi = require('joi');
const request = require('request');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/api/publishers',
        handler: function (req, reply) {
            reply({
                providers: state.news.publishers(),
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