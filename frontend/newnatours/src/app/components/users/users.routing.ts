import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";

let routes:Routes = [
{
    path: 'update-profile', component: UpdateProfileComponent
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule {}