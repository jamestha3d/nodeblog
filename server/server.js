/* installed nodemon for live reload server*/

const http = require('http');
const fs = require('fs');

/* we can create the server and store in a variable. this takes a callback
that runs anytime we receive  a request*/
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type. text/plain or text/html
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // how to do a redirect
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end()
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send a html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //we can also use just res.end(data) for only one data
            res.write(data);
            res.end();
        }
    })

});

//our server should listen on a port and host name and fire a callback that tells us that we are listening
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})
