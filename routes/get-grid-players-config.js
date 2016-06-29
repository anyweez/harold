/* jslint node: true */
'use strict'
const joi = require('joi');
const request = require('request');

const configs = [
    [
        { name: 'Small', energyPerMove: 1, startingEnergy: 20 },
        { name: 'Large', energyPerMove: 2, startingEnergy: 30 },
        { name: 'Gargantuan', energyPerMove: 4, startingEnergy: 100 },
    ],
    [
        { name: 'Fast', energyPerMove: 2, startingEnergy: 25 },
        { name: 'Slow', energyPerMove: 1, startingEnergy: 15 },
    ],
    [
        { name: 'Mercury', energyPerMove: 4, startingEnergy: 20 },
        { name: 'Mars', energyPerMove: 2, startingEnergy: 10 },
        { name: 'Saturn', energyPerMove: 10, startingEnergy: 200 },
    ],
];

module.exports = function (state) {
    return {
        method: 'get',
        path: '/api/players/{id}',
        handler: function (req, reply) {
            let id = parseInt(req.params.id);

            if (id >= 0 && id < configs.length) reply(configs[id]);
            else reply(configs[0]);
        },
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};