import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';
import { environment } from 'src/environments/environment';
import Stripe from 'stripe'

@Component({
  selector: 'app-get-one-tour',
  templateUrl: './get-one-tour.component.html',
  styleUrls: ['./get-one-tour.component.css']
})
export class GetOneTourComponent implements OnInit {
tourId
tour 
images = []
submitting 
selectedFiles = []
user = JSON.parse(localStorage.getItem('user'))
imagePath = environment.imageUrl + 'img/tours/'
imageUserPath = environment.imageUrl + 'img/users/'
// stripe 

  constructor(
    private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private notifyService: notifyService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    // this.stripe = new Stripe('pk_test_51J9UjNSD79gJJpiul8rFkBycfoit8ILWDkeVSoRjhf3esZq1iHhiQOtxpTue6MQqsKBYXdp2u2UQRpFDilZG3auI00ux0E94Ud', {
    //   apiVersion: '2020-08-27'
    // })
    this.tourId = this.activatedRoute.snapshot.params.tourId
    this.tourService.getOneTour(this.tourId)
    .subscribe((res:any) => {
      this.tour = res.doc
      console.log(this.tour)
      this.images = res.doc.images
    }, err => this.notifyService.showError(err))
  }
  onFilesSelected(e) {
    this.selectedFiles = Array.from(e.target.files)
  }
  uploadMultiple() {
    this.submitting = true
    this.tourService.editTour(this.tour, this.tourId, this.selectedFiles)
    .subscribe((res: any) => {
      this.submitting = false
      this.images = res.doc.images
      this.notifyService.showSuccess('tour images updated!')
    }, err => {
      this.submitting = false
      this.notifyService.showError(err)
    })
  }
  bookTour(tourId) {
    // 1 get the checkout session from the server
    this.submitting = true
    this.bookingService.checkoutSession(tourId)
    .subscribe((res: any) => {
      this.submitting = false
      // console.log(res)
    // 2 create checkout form and charge credit card
      // this.stripe.redirectToCheckout({
      //   sessionId: res.session.id
      // }).then(data => console.log(data))
    }, err => {
      this.notifyService.showError(err)
      this.submitting = false
    })   
  }
}
