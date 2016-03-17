/* jslint node: true, esnext: true */
const hapi = require('hapi');
const joi = require('joi');
const messagelog = require('./messagelog');

const host = 'localhost';
const port = 8000;

// Open a connection
const server = new hapi.Server();
server.connection({
    host: host,
    port: port,
});

var messages = messagelog.new();
messages.add('luke', 'guess whoooooo');

/**
 * GET request that returns all messages.
 */
server.route({
    method: 'get',
    path: '/messages',
    handler: function (request, reply) {
        // Create the options config object.
        var options = {};
        if (request.query.start) options.start = request.query.start;
        return reply(JSON.stringify(messages.fetch(options)));
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
});

server.route({
    method: 'post',
    path: '/messages',
    handler: function (request, reply) {
	var content = JSON.parse(request.payload);
        // Create a new message.
        messages.add(content.name, content.message);
        return reply();
    },
    config: {
//        validate: {
//            payload: {
//                name: joi.string().required().min(3),
//                message: joi.string().required().min(1),
//            },
//        },
        cors: {
            origin: ['*'],
        },
    },
});

server.start(function (error) {
    if (error) {
        throw error;
    }

    console.log('Simplespeak server running on ' + host + ':' + port);
});
