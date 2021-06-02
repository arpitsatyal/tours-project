import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-get-one-tour',
  templateUrl: './get-one-tour.component.html',
  styleUrls: ['./get-one-tour.component.css']
})
export class GetOneTourComponent implements OnInit {
tourId
tour 
  constructor(
    private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private notifyService: notifyService
  ) { }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params.tourId
    this.tourService.getOneTour(this.tourId)
    .subscribe((res:any) => {
      this.tour = res.doc
      console.log(this.tour)
    }, err => this.notifyService.showError(err))
  }
}
