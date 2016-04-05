/* jslint node: true, esnext: true */
const path = require('path');
const hapi = require('hapi');
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

// 
var routes = [
    require('./routes/get-messages'),
    require('./routes/post-messages'),
    require('./routes/get-stocks'),
    require('./routes/get-trinkets'),
];

var shared_state = {
    messages: messagelog.new(1000),
};
// Put an initial message in there so the log is never empty.
shared_state.messages.add('luke', 'guess whoooooo');

/**
 * GET request that returns all messages.
 */
routes.forEach(function (route) {
    server.route(route(shared_state));
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