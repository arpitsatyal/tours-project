import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/tourModel';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.component.html',
  styleUrls: ['./search-tour.component.css']
})
export class SearchTourComponent implements OnInit {
tour
allTours = []
public results = []
startLocations = []
submitting = false
showName = false
names = []
  constructor(
    private notify: notifyService,
    private toursService: TourService
  ) { }

  ngOnInit(): void {
    this.tour = new Tour({})
    this.toursService.getAllTours()
    .subscribe((res:any) => {
      this.allTours = res.data.tours
      this.allTours.forEach(tour => {
      if(!this.startLocations.includes(tour.startLocation.description)) this.startLocations.push(tour.startLocation.description)
       })
    }, err => this.notify.showError(err))
  }
  searchTour() {
    this.submitting =  true
    this.toursService.searchTour(this.tour)
    .subscribe((res: any) => {
      this.results = res.tours
      if(!this.results.length) this.notify.showInfo('no tours found for your query!')
      this.submitting = false
    }, err => {
      this.notify.showError(err)
      this.submitting = false
    })
  }
 
  onstartLocationSelected(startLocations) {
    this.showName = true
    this.names = this.allTours.filter(data => data.startLocation.description === startLocations)
  }
  resetSearch() {
    this.results.length = 0
    this.tour = new Tour({})
  }
}
