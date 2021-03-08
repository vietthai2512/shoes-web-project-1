import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';

import * as config from './config';

async function startServer()
{
    const app = express();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    await require('./loaders').default(app);

    /**
     * Get port from environment and store in Express.
     */
    const port = config.PORT || 5050;

    /**
     * SSL options
     */
    const sslOptions = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    };

    /**
     * Create HTTP & HTTPS server.
     */
    const server = http.createServer(app);
    const serverHTTPS = https.createServer(sslOptions, app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    serverHTTPS.listen(443);
    serverHTTPS.on('error', onError);
    serverHTTPS.on('listening', onListeningHTTPS);

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error: Error & { syscall: string; code: string; })
    {
        if (error.syscall !== 'listen')
        {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code)
        {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    function onListening()
    {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
        console.log('HTTP Server: Listening on ' + bind);
    }

    function onListeningHTTPS()
    {
        const addr = serverHTTPS.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
        console.log('HTTPS Server: Listening on ' + bind);
    }
}

startServer();
