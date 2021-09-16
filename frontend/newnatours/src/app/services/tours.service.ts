import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tourModel'
import { BaseService } from "./base.service";
import { UploadService } from "./upload.service";

@Injectable()
export class TourService extends BaseService {
    constructor(
        public http: HttpClient,
        public uploadService: UploadService
    ) {
        super('tours')
    }
    getAllTours(pageSize?, currentPage?) {
        let query = `?pagesize=${pageSize}&currentpage=${currentPage}`
        return this.http.get(this.url + query, this.setHeaders())
    }
    getOneTour(tourId) {
        return this.http.get(this.url + tourId, this.setHeaders())
    }
    createTour(tour: Tour) {
        return this.http.post(this.url, tour, this.setHeadersWithToken())
    }
    editTour(data: Tour, tourId, images) {
        let toSend
        if(!images) {
            toSend = data
        } else if(images.length) {
            toSend = this.uploadService.uploadImage(data, images, 'images')
        } 
        else {
            toSend = this.uploadService.uploadImage(data, images, 'imageCover')
        }
        return this.http.patch(this.url + tourId, toSend, this.setToken())
    }
    deleteTour(tourId) {
        return this.http.delete(this.url + tourId, this.setHeadersWithToken())
    }
    searchTour(tour: Tour) {
        return this.http.post(this.url + 'searchTour', tour, this.setHeaders())
    }
    searchByMonths(year) {
        return this.http.get(this.url + `tour-monthly-plan/${year}`, this.setHeaders())
    }
}