import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { notifyService } from "./notify.service";
import { TourService } from "./tours.service";
import { AuthService } from './auth.service'
@NgModule({
    declarations: [],
    imports: [
        CommonModule
      
    ],
    providers: [
        notifyService,
        TourService,
        AuthService
    ]
  })

  export class ServicesModule {}