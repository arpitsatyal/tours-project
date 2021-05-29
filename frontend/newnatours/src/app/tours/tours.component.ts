import { Component, OnInit } from '@angular/core';
import { TourService } from '../services/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
  tours = []
  constructor(
    private toursService: TourService
  ) { }

  ngOnInit(): void {
    this.getAllTours()
  }

  getAllTours() {
    this.toursService.getAllTours()
    .subscribe((res: any) => {
      this.tours = res.data.tours
      console.log(this.tours)
    }, err => console.log(err))
  }
}
