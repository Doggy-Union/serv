var http = require('http');
var url = require('url');
var fs = require('fs');
var eres;

var server = new http.Server();
server.listen(1337, '25.143.87.56'); // 10.1.30.34 (Guest) | 192.168.43.198 (SMART Sprint)

server.on('request', function(req, res) {
	var parsedUrl = url.parse(req.url, true);
	try {
		console.log(parsedUrl);
		if (parsedUrl.query.expression) {
			res.end('<html><head><title>ебалай</title></head><body>' + eval(url.parse(req.url, true).query.expression).toString() + '</body></html>');
			console.log(eval(parsedUrl.query.expression.toString()));
			console.log(eval(parsedUrl.query.expression));
			console.log('PATHNAME: ' + parsedUrl.pathname);
		}
		else if (!(parsedUrl.pathname == '/')) {
			if (parsedUrl.pathname.indexOf('.html') + 1) {
				fs.readFile('C:/Portfolio' + parsedUrl.pathname, 'utf8', function(err, data) {
					if (err) {
						console.error(err);
						console.log('Logo requested with error!');
					}
					else {
						res.setHeader('Content-Type', 'text/html');
						res.end(data, 'utf8');
						console.log('HTML is requested');
						console.log(data);
					}
				});
			}
			fs.readFile('C:/Portfolio' + parsedUrl.pathname, function(err, data) {
				if (err) {
					console.error(err);
					console.log('Logo requested with error!');
					res.end();
				}
				else {
					res.end(data);
					console.log(data);
				}
			});
			console.log('Logo requested');
			console.log(parsedUrl.pathname);
		}
		else if (parsedUrl.query.imgtest) {
			res.end('<html><head><title>IMG Testing</title></head><body><img src="logo.gif"></body></html>')
			console.log(parsedUrl.pathname);
		}
		else {
			res.end('Please, enter your expression to the GET-Request parameter "expression"\nInstruction: type your parameters after host and port through question mark in the address field. Example: 127.0.0.1:1337?expression=5*5');
			console.log('That is request of last way');
		}	
	}
	catch(err) {
	}
});