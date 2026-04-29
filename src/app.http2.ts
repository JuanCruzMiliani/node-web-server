import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer({
    key: fs.readFileSync(`${__dirname}/../keys/server.key`),
    cert: fs.readFileSync(`${__dirname}/../keys/server.crt`)
}, (req, res) => {
    
    if(req.url === '/'){
        const htmlFile = fs.readFileSync(`${__dirname}/public/index.html`, 'utf-8');
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('js')){
        res.writeHead(200, {'content-type': 'application/javascript'})
    } else if(req.url?.endsWith('css')){
        res.writeHead(200, {'content-type': 'text/css'})
    } else { 
        res.writeHead(404, { 'content-type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
    }

    try {    
        const responseContent = fs.readFileSync(`${__dirname}/public${req.url}`);
        res.end(responseContent);   
    } catch (error) {
        res.writeHead(400, {'content-type': 'text/html'});
        res.end();
    }
})

server.listen(8080, () => {
    console.log('Server Running on PORT 8080');
})