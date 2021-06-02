import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { notifyService } from 'src/app/services/notify.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
tourId
reviews
rating = [1,2,3,4,5]
@Input() user
  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private notify: notifyService
  ) { 
    console.log('in child ', this.user)
  }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params.tourId
    this.reviewService.getReviews(this.tourId)
    .subscribe((res: any) => {
      this.reviews = res.reviews
    }, err => this.notify.showError(err))
  }
  
}
