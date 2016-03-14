'use strict';
var http = require('http');
var fs = require('fs');
var infoCount;

http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Dominating that coding game, ever, so slowly');
    return res.end();
  }
  // if(req.method === 'GET' && req.url === '/today') {
  //     fs.readdir(__dirname + '/information', function(err, files){
  //     res.writeHead(200, {'Content-Type': 'text/plain'});
  //     console.log(files)
  //     res.write(files.toString());
  //   })
  //     return res.end()
  // }

  if (req.method === 'GET' && req.url === '/information') {
    res.writeHead(200, {'content-type': 'text/plain'})
    var infoVar = fs.readdirSync(__dirname + '/information')
      console.log(infoVar)
      res.write(infoVar.toString())
    return res.end();
  }
  if(req.method === 'POST' && req.url === '/information') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    req.on('data', (data) => {
      res.write(data);
      fs.readdir(__dirname + '/information', (err, files) => {
        infoCount = files.length;
        fs.writeFile(__dirname + '/information/info' + infoCount + '.json', data)
      })
    });
    req.on('end', () => {
      return res.end();
    });
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    return res.end();
  }

}).listen(3000, () => console.log('Server running on port 3000!'));

