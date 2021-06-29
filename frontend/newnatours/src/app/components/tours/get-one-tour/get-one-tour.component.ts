import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';
import { environment } from 'src/environments/environment';

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
}
