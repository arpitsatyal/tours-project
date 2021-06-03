import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SignupComponent } from "./signup/signup.component";

let routes: Routes = [
    {
        path: 'login', component: LoginComponent
    }, 
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'forgotPassword', component: ForgotPasswordComponent
    }, 
    {
        path: 'resetPassword/:token', component: ResetPasswordComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}