/* jslint node: true */
const joi = require('joi');
const request = require('request');

const configs = [
    { name: 'Small', energyPerMove: 1, startingEnergy: 20 },
    { name: 'Large', energyPerMove: 2, startingEnergy: 30 },
    { name: 'Gargantuan', energyPerMove: 4, startingEnergy: 100 },
]

module.exports = function (state) {
    return {
        method: 'get',
        path: '/api/players',
        handler: function (req, reply) {
            reply(configs);
        },
        config: {
            cors: true,
        },
    };
};