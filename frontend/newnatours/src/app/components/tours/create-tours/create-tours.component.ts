import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from 'src/app/models/tourModel';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css']
})
export class CreateToursComponent implements OnInit {
  tour
  submitting = false
  constructor(
    public tourService: TourService,
    public router: Router,
    public notifyService: notifyService
  ) { }

  ngOnInit(): void {
    this.tour = new Tour({})
  }

  createTour(tour) {
    this.submitting = true
    this.tourService.createTour(tour)
    .subscribe(res => {
      setTimeout(() => {
        this.notifyService.showSuccess('tour created!')
        this.submitting = false
        this.router.navigate(['/tours'])
      }, 3000)
    }, err => {
      this.submitting = false
      this.notifyService.showError(err)
    })
  }
}
