System.register(['@angular/core', './http.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_service_1;
    var Item, AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            Item = (function () {
                function Item(name, readme, pages) {
                    this.name = name;
                    this.readme = readme;
                    this.pages = pages;
                }
                return Item;
            }());
            exports_1("Item", Item);
            AppComponent = (function () {
                function AppComponent(httpService) {
                    this.httpService = httpService;
                    this.items = [];
                    this.standart_pages_count = 0;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.httpService.getData()
                        .subscribe(function (data) {
                        _this.items = data.json();
                        _this.standart_pages_count = _this.items[0].pages.length;
                    });
                };
                AppComponent.prototype.viewFrame = function (view, item_id, item, page_id) {
                    if (view == 'readme') {
                        var sel = item_id + 1;
                        var fr = 'frame-cont-readme' + sel;
                        if (document.getElementById(fr).style.display == "none") {
                            if (document.getElementById(fr).innerHTML == "") {
                                var ref = '<div><a href="/modules/' + item.name + item.readme + '" target="_blank">' + item.name + item.readme + '</a></div>';
                                var frame = '<iframe src="/modules/' + item.name + item.readme + '" width="100%" height="500"></iframe>';
                                document.getElementById(fr).innerHTML = ref + frame;
                            }
                            document.getElementById(fr).style.display = "block";
                        }
                        else {
                            document.getElementById(fr).style.display = "none";
                        }
                    }
                    else {
                        var sel = page_id + 1;
                        var sl = item_id + 1;
                        sel = sl + "_" + sel;
                        var fr = 'frame-cont-pages' + sel;
                        if (document.getElementById(fr).style.display == "none") {
                            if (document.getElementById(fr).innerHTML == "") {
                                var ref = '<div><a href="/modules/' + item.name + item.pages[page_id] + '" target="_blank">' + item.name + item.pages[page_id] + '</a></div>';
                                var frame = '<iframe src="/modules/' + item.name + item.pages[page_id] + '" width="100%" height="500"></iframe>';
                                document.getElementById(fr).innerHTML = ref + frame;
                            }
                            document.getElementById(fr).style.display = "block";
                        }
                        else {
                            document.getElementById(fr).style.display = "none";
                        }
                    }
                };
                AppComponent.prototype.searchItem = function (text) {
                    var _this = this;
                    if (text == "") {
                        this.items = [];
                        this.httpService.getData()
                            .subscribe(function (data) { return _this.items = data.json(); });
                        ;
                    }
                    else {
                        this.items = [];
                        this.httpService.getSearchData(text)
                            .subscribe(function (data) {
                            if (data.json().length > 0) {
                                _this.items = data.json();
                            }
                            else {
                                _this.items.push(new Item("Nothing is found"));
                            }
                        });
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'modules-view-app',
                        template: "\n    <div class=\"panel\">\n        <div class=\"form-inline\">\n            <div class=\"form-group\">\n                <div class=\"col-md-8\">\n                    <input class=\"form-control\" [(ngModel)]=\"text\" placeholder = \"Text\" />\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-md-offset-2 col-md-8\">\n                    <button class=\"btn btn-default\" (click)=\"searchItem(text)\">Search</button>\n                </div>\n            </div>\n        </div>\n\t<div class=\"page-header\">\n        \t<h1> List of modules </h1>\n    \t</div>    \n\t    <ul class=\"list-group\">\n\t      <li *ngFor=\"let item of items; let i = index\" class=\"list-group-item\">\n\t\t<h2>{{item.name}}</h2>\n\t\t<ul class=\"list-group\">\n\t\t  <li *ngIf=\"item.readme\" class=\"list-group-item\">\n\t\t\t<button class=\"btn btn-primary\" (click)=\"viewFrame('readme', i, item)\">Readme</button>\n\t\t\t<div class=\"frame-cont\" id=\"frame-cont-readme{{i+1}}\" style=\"display:none;\"></div>\n\t\t  </li>\n\t\t  <div *ngIf=\"item.pages\"><li *ngFor=\"let page of item.pages; let j = index\" class=\"list-group-item\">\n\t\t\t<button class=\"btn btn-primary\" (click)=\"viewFrame('page', i, item, j)\">\n\t\t\t\t<span *ngIf=\"j == 0\">Documentation</span>\n\t\t\t\t<span *ngIf=\"j == 1\">Test coverage</span>\n\t\t\t\t<span *ngIf=\"j > 1\">Page {{j - 1}}</span>\n\t\t\t</button>\n\t\t\t<div class=\"frame-cont\" id=\"frame-cont-pages{{i+1}}_{{j+1}}\" style=\"display:none;\"></div>\n\t\t  </li></div>\n\t\t</ul>\n\t      </li>\n\t    </ul>\n    </div>",
                        providers: [http_service_1.HttpService]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map