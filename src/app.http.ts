import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    
    console.log(req.url);
    console.log(req.url);
    //res.writeHead(200, {'content-type': 'text/html'});
    //res.write(`<h1>URL ${req.url}</h1>` );
    // res.end();

    // const data = {name: 'Jhon Dow', age: 30, city: 'New York'}
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('C:/Users/Cacu/Desktop/Curso-NodeJs/07-RestWeb/src/public/index.html', 'utf-8'); //./public/index.html
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('js')){
        res.writeHead(200, {'content-type': 'application/javascript'})
    } else if(req.url?.endsWith('css')){
        res.writeHead(200, {'content-type': 'text/css'})
    }else {
        // Si no es raíz, ni JS, ni CSS, mandamos 404 y salimos
        res.writeHead(404, { 'content-type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
    }

    const responseContent = fs.readFileSync(`C:/Users/Cacu/Desktop/Curso-NodeJs/07-RestWeb/src/public${req.url}`);//./public${req.url}
    res.end(responseContent);
    /**/ 
})

server.listen(8080, () => {
    console.log('Server Running on PORT 8080');
})