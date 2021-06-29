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
    getAllTours() {
        return this.http.get(this.url, this.setHeaders())
    }
    getOneTour(tourId) {
        return this.http.get(this.url + tourId, this.setHeadersWithToken())
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
}