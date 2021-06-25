import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'))
  allTours = []
  matchedTour = []
  imagePath = environment.imageUrl + 'img/' + 'users'
  @Output() sendToGet = new EventEmitter()
  constructor(
    private router: Router,
    private toursService: TourService,
    private notify: notifyService
  ) {
   }

  ngOnInit(): void {
    this.toursService.getAllTours()
      .subscribe((res: any) => this.allTours = res.data.tours, err => this.notify.showError(err))
  }
  search(ev) {
    this.allTours.forEach(tour => {
      let splitted = tour.name.split(' ')
      let name
    if (splitted.length > 1) {
      name = splitted[0] + ' ' + splitted[1]
    }
      if(name.toLowerCase() === ev.target.value) {
        this.matchedTour.push(tour)
        this.sendToGet.emit(this.matchedTour)
      } else if(ev.key === 'Backspace') {
        this.matchedTour = []
        this.sendToGet.emit(this.matchedTour)
      }
    })
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate([''])
  }

}
