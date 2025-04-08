/* eslint-disable no-undef */
const http = require('http');
const fs = require('fs');
const url = require('url');
// eslint-disable-next-line no-undef
const path = require('path');
const minimist = require('minimist');


// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;  

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

 
  if (parsedUrl.pathname === '/registration') {
    fs.readFile(path.join(__dirname, 'registration.html'), 'utf8', (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.end('Error reading registration.html');
        return;
      }
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
    return;
  }

 
  if (parsedUrl.pathname === '/projects') {
    fs.readFile(path.join(__dirname, 'projects.html'), 'utf8', (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.end('Error reading projects.html');
        return;
      }
    
      data = data.replace('</body>', '<a href="/registration">Go to Registration Page</a></body>');
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
    return;
  }


  response.statusCode = 404;
  response.end('Page not found');
});


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});