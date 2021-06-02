import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";
import { Review } from "../models/reviewModel";

@Injectable()
export class ReviewService extends BaseService {
    constructor(
        public http: HttpClient
    ) {
        super('tours')
    }
  getReviews(tourId) {
      return this.http.get(`${this.url}${tourId}/reviews`, this.setHeadersWithToken())
  }
  createReview(review: Review, tourId) {
      return this.http.post(this.url + tourId + '/' + 'reviews', review, this.setHeadersWithToken())
  }
}