import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { notifyService } from "./notify.service";
import { TourService } from "./tours.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
      
    ],
    providers: [
        notifyService,
        TourService
    ]
  })

  export class ServicesModule {}