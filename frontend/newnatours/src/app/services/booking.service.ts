import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class BookingService extends BaseService {
    constructor(
        public http: HttpClient
    ) {
        super('bookings')
    }
 checkoutSession(tourId) {
     return this.http.get(this.url + `checkout-session/${tourId}`, this.setHeadersWithToken())
 }
}