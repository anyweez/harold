/* jslint node: true */
const joi = require('joi');
const request = require('request');

module.exports = function (state) {
    return {
        method: 'get',
        path: '/stocks/{symbol}',
        handler: function (req, reply) {
            console.log('ticker: ' + req.params.symbol);
            request({
                url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + req.params.symbol,
                json: true,
            }, function (err, response, body) {
                console.log(body);
                reply(body);
            });
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