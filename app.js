'use strict';
let http = require('http'),
    fs   = require('fs'),
    url  = require('url');

let Router = require('./router');
let appSettings = require('./appsettings.json');

class Server {
    static start(port) {
        this.getRoutes(port).then(this.createServer);
    }

    static getRoutes(port) {
        return new Promise(function(resolve) {
            fs.readFile('routes.json', { encoding: 'utf8' }, function(error, routes) {
                if (!error) {
                    resolve({
                        port: port,
                        routes: JSON.parse(routes)
                    });
                }
            });
        });
    }

    static createServer(settings) {
        http.createServer(function(request, response) {
            let path = url.parse(request.url).pathname;
            let found = Router.find(path, settings.routes);
            try {
                let handler = require('./handlers/' + found.route.handler);
                handler[found.route.action](response, found.data);
            } catch(e) {
		var urlpath = __dirname + url.parse(request.url).pathname;
		fs.readFile(urlpath, { encoding: 'utf8' }, function(error, file) {
			if (!error) {
				response.writeHead(200);
                		response.end(file);
			}
			else {
				response.writeHead(404);
				response.end();
			}
		});
            }
    }).listen(settings.port);
}
}

Server.start(appSettings.serverport);
