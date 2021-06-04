import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CreateReviewComponent } from './create-review/create-review.component';
import { CreateToursComponent } from './create-tours/create-tours.component';
import { EditToursComponent } from './edit-tours/edit-tours.component';
import { GetOneTourComponent } from './get-one-tour/get-one-tour.component';
import { ToursComponent } from './get-tours/tours.component';
import { SearchTourComponent } from './search-tour/search-tour.component';

const routes: Routes = [
   {
    path: '', component: ToursComponent
   }, {
       path: 'createTour', component: CreateToursComponent
   }, {
       path: 'editTour/:tourId', component: EditToursComponent
   }, {
       path: 'getOneTour/:tourId', component: GetOneTourComponent
   }, {
       path: ':tourId/createReview', component: CreateReviewComponent
   }, {
       path: ':tourId/updateReview/:reviewId', component: CreateReviewComponent
   },
   {
       path: 'searchTour', component: SearchTourComponent
   }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ToursRoutingModule {}