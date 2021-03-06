import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";
import { User } from "../models/userModel";

@Injectable()
export class AuthService extends BaseService {
    constructor(
        public http: HttpClient
    ) {
        super('users')
    }
   login(user: User) {
    return this.http.post(this.url + 'login', user, this.setHeaders())
   }
   register(user: User) {
       return this.http.post(this.url + 'signup', user, this.setHeaders())
   }
   forgotPassword(data) {
       return this.http.post(this.url + 'forgotPassword', data, this.setHeaders())
   }
   resetPassword(token, data) {
    return this.http.patch(this.url + 'resetPassword/' + token, data, this.setHeaders())
   }
}

