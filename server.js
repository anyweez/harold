'use strict'

let process = require('process');
let harold = require('./harold');

const host = '0.0.0.0';
const port = process.env.PORT || 7000;

harold({
    host: host,
    port: port,
}).catch(function (err) {
    console.error(err);  
});
