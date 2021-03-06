import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/models/tourModel';
import { notifyService } from 'src/app/services/notify.service';
import { TourService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-edit-tours',
  templateUrl: './edit-tours.component.html',
  styleUrls: ['./edit-tours.component.css']
})
export class EditToursComponent implements OnInit {
  tour 
  tourId 
  submitting
  selectedFile
  constructor(
    public tourService: TourService,
    public notifyService: notifyService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.tour = new Tour({})
    this.tourId = this.activatedRoute.snapshot.params.tourId
  }
  onFileSelected(e) {
    this.selectedFile = e.target.files[0]
  }
  editTour(tour) {
    this.submitting = true
    this.tourService.editTour(tour, this.tourId, this.selectedFile)
    .subscribe(() => {
      this.notifyService.showSuccess('edited!')
      this.submitting = false
      this.router.navigate(['/tours'])
    }, err => {
      this.notifyService.showError(err)
      this.submitting = false
    })
  }
}
