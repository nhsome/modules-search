import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
 
@Injectable()
export class HttpService{
 
    constructor(private http: Http){ }
     
    getData(){
        return this.http.get('/api/modules')
    }
    getSearchData(text: string){
        return this.http.get('/api/search_' + encodeURIComponent(text))
    }
}
