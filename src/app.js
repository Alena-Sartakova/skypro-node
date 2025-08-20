const http = require('http');
const getUsers = require('./modules/users')

const server = http.createServer((request, response) => {
    const baseURL = 'http://' + request.headers.host + '/';
    const url = new URL(request.url, baseURL);
    const params = url.searchParams;

    // Обработка параметра ?users
    if (params.has('users')) {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(getUsers());
        return;
    }

    // Обработка параметра ?hello
    if (params.has('hello')) {
        const name = params.get('hello').trim();
        
        if (name) {
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end(`Hello, ${name}.`);
        } else {
            response.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            response.end('Enter a name');
        }
        return;
    }

    // Обработка случая без параметров
    if (params.size === 0) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end('Hello, World!');
        return;
    }

    // Обработка всех остальных параметров
    response.writeHead(500);
    response.end();
});

server.listen(3003, () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003")
})