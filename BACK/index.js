require('dotenv').config();

const debug = require('debug')('server');

const fs = require('fs');
const https = require('https');

const app = require('./app/app');

const port = process.env.PORT || 5000;

https
    .createServer(
        {
            key: fs.readFileSync('conf/server.key'),
            cert: fs.readFileSync('conf/server.cert'),
        },
        app,
    )
    .listen(port, () => {
        debug(`Server started on https://localhost:${port}`);
    });
