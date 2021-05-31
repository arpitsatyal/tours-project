import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ToursModule } from './components/tours/tours.module';
import { ToastrModule } from 'ngx-toastr';
import { notifyService } from './services/notify.service';
import { ServicesModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToursModule,
    ToastrModule.forRoot(),
    ServicesModule
  ],
  providers: [notifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
