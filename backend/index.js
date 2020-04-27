const express = require('express');

const server = express();

server.listen(3333);
server.use(express.json());

server.get('/', (request, response) => {
    response.send('Hello World!');
});