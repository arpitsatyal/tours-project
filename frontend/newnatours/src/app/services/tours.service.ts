import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class TourService  {
    url
    constructor(
        public http: HttpClient
    ) {
        this.url = environment.BaseUrl
    }
    getAllTours() {
        return this.http.get(this.url + 'tours', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
}
