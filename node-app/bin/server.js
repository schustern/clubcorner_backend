#!/usr/bin/env node
const app = require('../app');
const debug = require('debug')('node-app:server');
const http = require('http');
//const normalizePort = require('normalize-port');

/**
 * Get port from environment and store in Express.
 */


const port = process.env.PORT || '3000';
//const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);