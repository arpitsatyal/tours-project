import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CreateToursComponent } from './create-tours/create-tours.component';
import { ToursComponent } from './get-tours/tours.component';

const routes: Routes = [
   {
    path: '', component: ToursComponent
   }, {
       path: 'createTour', component: CreateToursComponent
   }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ToursRoutingModule {}