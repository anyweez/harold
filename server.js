/* jslint node: true, esnext: true */
'use strict'

const fs = require('mz/fs');
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const colors = require('colors');

const host = '0.0.0.0';
const port = process.env.PORT || 7000;

// Open a connection
const server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            },
        },
    },
});

server.connection({
    host: host,
    port: port,
});

server.register(inert, function () { });

function logEvent(method, route, message) {
    let when = new Date().toISOString();
    console.log(`${colors.gray(when)}\t${colors.green(method)}\t${colors.gray(route)}\t${message}`);
}

/**
 * 1. Load all state containers and initialize them with stating state.
 * 2. Load all routes (get, post, put, delete).
 * 3. Initialize a static content route pointing to public/ and start the server.
 */

/**
 * Load all state containers.
 */
fs.readdir('./state').then(contents => {
    let state = {};

    contents.filter(name => name.endsWith('.js')).forEach(filename => {
        let name = filename.slice(0, -3);
        let StateItem = require(`./state/${name}`);

        state[name] = new StateItem();
        console.log(`state.${name} initialized`);
    });

    return state;
}).then(function (state) {
    /** 
     * Load all routes.
     */
    let loaders = [];
    ['get', 'post', 'put', 'delete'].forEach(function (method) {
        let basedir = `./routes/${method}/`;

        let loader = fs.readdir(basedir).then(directories => {
            directories.filter(name => name.endsWith('.js')).forEach(filename => {
                let mod = require(`${basedir}${filename}`);
                // TODO: customizable path should be defined in module
                let path = `/${filename.slice(0, -3)}`;

                server.route({
                    method: method,
                    path: path,
                    handler(request, reply) {
                        logEvent(method, path, 'request');
                        mod.handler(request, reply, state);
                    },
                    config: {
                        cors: {
                            origin: ['*'],
                        },
                    },
                });

                logEvent(method, path, 'initialized');
            });
        });

        loaders.push(loader);
    });

    /**
     * Once all routes have been loaded, initialize the inert route and start the server.
     */
    Promise.all(loaders).then(function () {
        // Fallback route in case none of the other routes match, via inert.
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
            if (error) throw error;

            console.log(`Harold running on ${host}:${port}`);
        });
    });
});