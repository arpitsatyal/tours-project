import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})

export class ToursComponent implements OnInit {
  public allTours = []
  matchedTour = []
  pageSize = 6
  currentPage = 1
  totalTours 
  pageSizeOptions = [3,6,9,12]
  imagePath = environment.imageUrl + 'img/tours/'
  user = JSON.parse(localStorage.getItem('user'))
  @Input() inputData: any
  @Output() searchagain = new EventEmitter()
  constructor(
    private toursService: TourService,
    private notify: notifyService
  ) { }

  ngOnInit(): void {
    this.toursService.getAllTours(this.pageSize, this.currentPage)
      .subscribe((res: any) => {
        if (this.inputData) {
          this.allTours = this.inputData
        } else {
            this.allTours = res.data.tours
            this.totalTours = res.data.totalTours
        }
      }, err => this.notify.showError(err))
  }

  deleteTour(id: string, index) {
    this.toursService.deleteTour(id)
      .subscribe(() => {
        this.allTours.splice(index, 1)
        this.notify.showSuccess('tour deleted!')
      }, err => this.notify.showError(err))
  }

  searchAgain() {
    this.searchagain.emit()
  }
  getMatchedTour(ev) {
    this.matchedTour = ev
  }
  onChangedPage(pageData: PageEvent) {
    this.pageSize = pageData.pageSize
    this.currentPage = pageData.pageIndex + 1
    this.toursService.getAllTours(this.pageSize, this.currentPage)
    .subscribe((res: any) => this.allTours = res.data.tours, err => this.notify.showError(err))
  }
}