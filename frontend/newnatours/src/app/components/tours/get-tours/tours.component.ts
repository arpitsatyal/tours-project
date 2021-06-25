import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-get-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})

export class ToursComponent implements OnInit {
  public allTours = []
  matchedTour = []
  user = JSON.parse(localStorage.getItem('user'))
  @Input() inputData: any
  @Output() searchagain = new EventEmitter()
  constructor(
    private toursService: TourService,
    private notify: notifyService
  ) { }

  ngOnInit(): void {
    this.toursService.getAllTours()
      .subscribe((res: any) => {
        if (this.inputData) {
          this.allTours = this.inputData
        } else {
            this.allTours = res.data.tours
        }
      }, err => this.notify.showError(err))
  }

  deleteTour(id: string, index) {
    this.toursService.deleteTour(id)
      .subscribe(() => {
        this.allTours.splice(index, 1)
        this.notify.showSuccess('tour deleted!')
      }, err => console.log(err))
  }

  searchAgain() {
    this.searchagain.emit()
  }
  getMatchedTour(ev) {
    this.matchedTour = ev
  }
}