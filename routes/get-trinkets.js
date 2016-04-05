/* jslint node: true */
const joi = require('joi');
const request = require('request');

function PriceHistory(max) {
    this.history = [];
    this.max = max;

    return this;
}

PriceHistory.prototype.add = function (val) {
    if (this.history.length > this.max) {
        this.history.shift();
    }

    this.history.push(val);
};

PriceHistory.prototype.current = function () {
    var avg = 0;

    for (var i = 0; i < this.history.length; i++) {
        avg += this.history[i];
    }

    return avg / this.history.length;
};

module.exports = function (state) {
    var history = new PriceHistory(5);
    history.add(Math.round(Math.random() * 1000) / 10);

    // Add a new historical value every five seconds.
    setInterval(function () {
        history.add(Math.round(Math.random() * 1000) / 10);
    }, 3000);

    return {
        method: 'get',
        path: '/price',
        handler: function (req, reply) {
            reply({
                price: history.current(),
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