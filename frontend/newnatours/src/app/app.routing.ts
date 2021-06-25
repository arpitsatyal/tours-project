import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './services/shared/page-not-found/page-not-found.component';

let routes: Routes = [
    {
        path: '', pathMatch: 'full', component: WelcomeComponent
    },
   {
       path: 'tours', loadChildren: './components/tours/tours.module#ToursModule'
   },
   {
       path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'
   },
   {
    path: '**', component: PageNotFoundComponent
   }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }