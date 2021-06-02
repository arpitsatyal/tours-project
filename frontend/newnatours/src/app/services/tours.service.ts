import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tourModel'
import { BaseService } from "./base.service";

@Injectable()
export class TourService extends BaseService {
    constructor(
        public http: HttpClient
    ) {
        super('tours')
    }
    getAllTours() {
        return this.http.get(this.url, this.setHeaders())
    }
    getOneTour(tourId) {
        return this.http.get(this.url + tourId, this.setHeadersWithToken())
    }
    createTour(tour: Tour) {
        return this.http.post(this.url, tour, this.setHeadersWithToken())
    }
    editTour(tour: Tour, tourId) {
        return this.http.patch(this.url + tourId, tour, this.setHeadersWithToken())
    }
    deleteTour(tourId) {
        return this.http.delete(this.url + tourId, this.setHeadersWithToken())
    }
}