import { Component, OnInit } from '@angular/core';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours = []
  user
  constructor(
    private toursService: TourService,
    private notify: notifyService
  ) { }

  ngOnInit(): void {
    this.getAllTours()
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  getAllTours() {
    this.toursService.getAllTours()
    .subscribe((res: any) => {
      this.tours = res.data.tours
      console.log(this.tours)
    }, err => console.log(err))
  }

  deleteTour(id: string) {
    this.toursService.deleteTour(id)
    .subscribe(() => {
      this.getAllTours()
      this.notify.showSuccess('tour deleted!')
    }, err => console.log(err))
}
}