'use strict';
let fs = require('fs');
var glob = require('glob');  
var http = require('http');
var path = require('path');
var Finder = require('fs-finder');
let appSettings = require('./../appsettings.json');

var PathToModules = '/modules/';
PathToModules = path.join(__dirname, '..') + PathToModules;

var PathsToModulesHtml = appSettings.pathstostatichtml;
var PathToReadme = appSettings.pathtoreadme;

let View = require('../view');

function in_array(value, array) 
{
    for(var i = 0; i < array.length; i++) 
    {
        if(array[i] == value) return true;
    }
    return false;
}

class Main {
    static index(response) {
        View.render(response, 'index.html');
    }
    static api(response, data) {
	glob( PathToModules + '*', function( err, modules ) {
		function Module(name, readme, pages) {
		  this.name = name;
		  this.readme = readme;
		  this.pages = pages;
		}
		//delete the main path in the names of modules
		var modules_obj = [];
		for (var i = 0; i < modules.length; i++) {
			var module = new Module(modules[i],"", []);
			modules_obj[i] = module;
			modules_obj[i].name = modules[i].split(PathToModules).join("");
			modules[i] = modules[i].split(PathToModules).join("");
		}
		
		var search_html = [];
			
		for (var i = 0; i < modules.length; i++) {
			for (var j = 0; j < PathsToModulesHtml.length; j++) {
				search_html.push(PathToModules + modules[i] + PathsToModulesHtml[j]);
			}
		}
			
		var files_html = [];
		var file;
			
		for (var i = 0; i < search_html.length; i++) {
			file = Finder.in(search_html[i]).findFiles('index.html');
			if (file[0] != undefined) {
				files_html.push(file[0]);
			}
		}
		for (var i = 0; i < files_html.length; i++) {
			files_html[i] = files_html[i].split(PathToModules).join("");
		}

		for (var i = 0; i < modules_obj.length; i++) {
			for (var j = 0; j < files_html.length; j++) {
				if ((files_html[j].indexOf(modules_obj[i].name) == 0)&&(files_html[j][modules_obj[i].name.length] == "/")) 				{
					modules_obj[i].pages.push(files_html[j].split(modules_obj[i].name).join(""));
				}
			}
		}
		for (var i = 0; i < modules_obj.length; i++) {
			file = Finder.in(PathToModules + modules_obj[i].name + PathToReadme).findFiles("README.md");
			if (file[0] != undefined) {
				modules_obj[i].readme = PathToReadme + "README.md";
			}
		}

		if (data.get == "modules") {
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(JSON.stringify(modules_obj));
			response.end();
		}
		else if (data.get.indexOf("search_") == 0) {
			var get = decodeURIComponent(data.get.substring("search_".length, data.get.length));

			var modules_obj2 = [];

			for (var i = 0; i < modules_obj.length; i++) {
				if (modules_obj[i].name.indexOf(get) > -1) {
					modules_obj2.push(modules_obj[i]);
				}
				else {
					var readmepath = PathToModules + modules_obj[i].name + modules_obj[i].readme;
					var readme = fs.readFileSync(readmepath , { encoding: 'utf8' });
					
					if (readme.indexOf(get) > -1) {
						modules_obj2.push(modules_obj[i]);
					}
					else {
						for (var j = 0; j < modules_obj[i].pages.length; j++) {
							var pagepath = PathToModules + modules_obj[i].name + modules_obj[i].pages[j];
							var page = fs.readFileSync(pagepath , { encoding: 'utf8' });

							if (page.indexOf(get) > -1) {
								modules_obj2.push(modules_obj[i]);
								break;
							}
						}
					}
				}
			}

			
			for (var i = 0; i < modules_obj2.length; i++) {
				var files_find = Finder.from(PathToModules + modules_obj2[i].name + "/").findFiles("*.html");
				for (var j = 0; j < files_find.length; j++) {
					if (!in_array(files_find[j].split(PathToModules + modules_obj2[i].name).join(""), modules_obj2[i].pages))
					{
						var page = fs.readFileSync(files_find[j] , { encoding: 'utf8' });
						if (page.indexOf(get) > -1) {
							modules_obj2[i].pages.push(files_find[j].split(PathToModules + modules_obj2[i].name).join(""));
						}
					}
				}
			}
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(JSON.stringify(modules_obj2));
			response.end();
		}
		else {
			response.writeHead(404, { 'Content-Type': 'text/html'});
			response.end('404. Not Found');
		}
			
	});
    }
}

module.exports = Main;
