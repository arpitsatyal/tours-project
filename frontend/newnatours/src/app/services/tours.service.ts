import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Tour} from '../models/tourModel'

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
    createTour(tour: Tour) {
        return this.http.post(this.url + 'tours', tour, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
    deleteTour(id) {
        return this.http.delete(this.url + 'tours/' + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
}
