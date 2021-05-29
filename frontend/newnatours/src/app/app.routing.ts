import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component';

let routes: Routes = [
    {
        path: '', pathMatch: 'full', component: WelcomeComponent
    },
   {
       path: 'tours', loadChildren: './tours/tours.module#ToursModule'
   }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }