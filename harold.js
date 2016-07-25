/* jslint node: true, esnext: true */
'use strict'

const fs = require('mz/fs');
const path = require('path');
const hapi = require('hapi');
const inert = require('inert');
const colors = require('colors');

// const host = '0.0.0.0';
// const port = process.env.PORT || 7000;

const codes = {
    warning: [404],
    error: [500],
};

const methods = ['get', 'post', 'put', 'delete'];

module.exports = function ({ host, port }) {
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

    server.on('response', function (request) {
        logEvent({
            method: request.method,
            route: request.url.path,
            message: '',
            code: request.response.statusCode,
        });
    });

    function logEvent({ method, route, message = undefined, code = '---' }) {
        let when = new Date().toISOString();
        let where = `${code}\t${method.toUpperCase()}\t${route}`;

        let whereColor = colors.green;

        if (codes.warning.indexOf(code) !== -1) whereColor = colors.yellow;
        if (codes.error.indexOf(code) !== -1) whereColor = colors.red;

        console.log(`${colors.gray(when)}\t${whereColor(where)}\t${message}`);
    }

    /**
     * 1. Load all state containers and initialize them with stating state.
     * 2. Load all routes (get, post, put, delete).
     * 3. Initialize a static content route pointing to public/ and start the server.
     */

    /**
     * Load all state containers.
     */
    return fs.readdir('./state').then(contents => {
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
        methods.forEach(function (method) {
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
                            // logEvent(method, path, 'request');
                            mod.handler(request, reply, state);
                        },
                        config: {
                            description: 'example method',
                            cors: {
                                origin: ['*'],
                            },
                        },
                    });

                    logEvent({
                        method: method,
                        route: path,
                        message: 'initialized'
                    });
                });
            });

            loaders.push(loader);
        });

        /**
         * Once all routes have been loaded, initialize the inert route and start the server.
         */
        return Promise.all(loaders).then(function () {
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

            return new Promise((resolve, reject) => {
                server.start(function (error) {
                    if (error) reject(error);

                    console.log(`Harold running on ${host}:${port}`);
                    resolve();
                });
            });
        });
    });
}

