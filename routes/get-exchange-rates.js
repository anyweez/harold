/* jslint node: true */
const joi = require('joi');
const request = require('request');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/exchange',
        handler: function (req, reply) {
            request({
                url: 'http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json',
                json: true,
            }, function (err, response, body) {
                reply(body);
            });
        },
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};