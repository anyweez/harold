/* jslint node: true, esnext: true */
const path = require('path');
const hapi = require('hapi');
const joi = require('joi');
const inert = require('inert');
const messagelog = require('./messagelog');

const host = '0.0.0.0';
const port = process.env.PORT || 7000;

// Open a connection
const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    host: host,
    port: port,
});

server.register(inert, function () {});

var messages = messagelog.new(1000);
messages.add('luke', 'guess whoooooo');

/**
 * GET request that returns all messages.
 */
server.route({
    method: 'get',
    path: '/messages',
    handler: function (request, reply) {
        console.log(new Date().toISOString() + '\tGET /messages');
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
        console.log(new Date().toISOString() + '\tPOST /messages [' + content.message + ']');
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

server.route({
    method: 'get',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    },
});


server.start(function (error) {
    if (error) {
        throw error;
    }

    console.log('Simplespeak server running on ' + host + ':' + port);
});