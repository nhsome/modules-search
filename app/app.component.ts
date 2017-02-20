import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import { HttpService} from './http.service';
     
export class Item{
    name: string;
    readme: string;
    pages: array;
     
    constructor(name: string, readme: string, pages: array) {
        this.name = name;
	this.readme = readme;
        this.pages = pages;
    }
}
 
@Component({
    selector: 'modules-view-app',
    template: `
    <div class="panel">
        <div class="form-inline">
            <div class="form-group">
                <div class="col-md-8">
                    <input class="form-control" [(ngModel)]="text" placeholder = "Text" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-2 col-md-8">
                    <button class="btn btn-default" (click)="searchItem(text)">Search</button>
                </div>
            </div>
        </div>
	<div class="page-header">
        	<h1> List of modules </h1>
    	</div>    
	    <ul class="list-group">
	      <li *ngFor="let item of items; let i = index" class="list-group-item">
		<h2>{{item.name}}</h2>
		<ul class="list-group">
		  <li *ngIf="item.readme" class="list-group-item">
			<button class="btn btn-primary" (click)="viewFrame('readme', i, item)">Readme</button>
			<div class="frame-cont" id="frame-cont-readme{{i+1}}" style="display:none;"></div>
		  </li>
		  <div *ngIf="item.pages"><li *ngFor="let page of item.pages; let j = index" class="list-group-item">
			<button class="btn btn-primary" (click)="viewFrame('page', i, item, j)">
				<span *ngIf="j == 0">Documentation</span>
				<span *ngIf="j == 1">Test coverage</span>
				<span *ngIf="j > 1">Page {{j - 1}}</span>
			</button>
			<div class="frame-cont" id="frame-cont-pages{{i+1}}_{{j+1}}" style="display:none;"></div>
		  </li></div>
		</ul>
	      </li>
	    </ul>
    </div>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit {
 items: Item[]=[];

 standart_pages_count: number = 0;

 constructor(private httpService: HttpService){}
    ngOnInit(){
         
        this.httpService.getData()
        	.subscribe((data: Response) => {
			this.items=data.json();
			this.standart_pages_count = this.items[0].pages.length;
            	});
    }

  viewFrame(view: string, item_id: int, item: object, page_id): void {
	if (view == 'readme') {
		let sel = item_id + 1;
		let fr = 'frame-cont-readme' + sel;
		if (document.getElementById(fr).style.display == "none") {
			if (document.getElementById(fr).innerHTML == "") {
				let ref = '<div><a href="/modules/' + item.name + item.readme + '" target="_blank">' + item.name + item.readme + '</a></div>';
				let frame = '<iframe src="/modules/' + item.name + item.readme + '" width="100%" height="500"></iframe>';
				document.getElementById(fr).innerHTML = ref + frame;
			}
			document.getElementById(fr).style.display = "block";
		}
		else {
			document.getElementById(fr).style.display = "none";
		}
	}
	else {
		let sel = page_id + 1;
		let sl = item_id + 1;
		sel = sl + "_" + sel;
		let fr = 'frame-cont-pages' + sel;
		if (document.getElementById(fr).style.display == "none") {
			if (document.getElementById(fr).innerHTML == "") {
				let ref = '<div><a href="/modules/' + item.name + item.pages[page_id] + '" target="_blank">' + item.name + item.pages[page_id] + '</a></div>';
				let frame = '<iframe src="/modules/' + item.name + item.pages[page_id] + '" width="100%" height="500"></iframe>';
				document.getElementById(fr).innerHTML = ref + frame;
			}
			document.getElementById(fr).style.display = "block";
		}
		else {
			document.getElementById(fr).style.display = "none";
		}
	}
  }
  searchItem(text: string): void {
	if (text == "") {
		this.items = [];
		this.httpService.getData()
			.subscribe((data: Response) => this.items=data.json()));
	}
	else {
		this.items = [];
		this.httpService.getSearchData(text)
			.subscribe((data: Response) => {
				if (data.json().length > 0) {
					this.items=data.json();
				}
				else {
					this.items.push(new Item("Nothing is found"));
				}
			});
	}
  }
}
