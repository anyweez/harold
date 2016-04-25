/* jslint node: true, esnext: true */
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
// const ws = require('ws');
const websocket = require('hapi-plugin-websocket');
const messagelog = require('./messagelog');
const news = require('./news');

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

server.register(inert, function () { });

// const socketServer = new ws.Server({
//     server: server,
// })

// socketServer.broadcast = function (data) {
//     socketServer.clients.forEach(function (client) {
//         client.send(JSON.stringify(data));
//     });
// };

var routes = [
    require('./routes/get-messages'),
    require('./routes/post-messages'),
    require('./routes/get-trinkets'),
    require('./routes/get-exchange-rates'),
    require('./routes/get-news-providers'),
    require('./routes/get-news-stories'),
];

var shared_state = {
    messages: messagelog.new(1000),
    news: news.new(),
};
// Put an initial message in there so the log is never empty.
shared_state.messages.add('luke', 'guess whoooooo');

/**
 * GET request that returns all messages.
 */
routes.forEach(function (route) {
    server.route(route(shared_state));
});

server.register(websocket, function () {
    server.route({
        method: 'POST',
        path: '/api/feed',
        config: {
            plugins: {
                websocket: {
                    only: true,
                    connect: function (wss, ws) {
                        shared_state.news.notify = wss.clients;
                        ws.send(JSON.stringify({ msg: 'youre here' }));
                    },
                }
            },
        },
        handler: function (request, reply) {
            
        },
    })
});

// Fallback route in case none of the other routes match.
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