import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";
import { User } from "../models/userModel";
import { UploadService } from "./upload.service";

@Injectable()
export class UsersService extends BaseService {
    constructor(
        public http: HttpClient,
        public uploadService: UploadService
    ) {
        super('users')
    }
    updateMe(data: User, image) {
        let toSend
        if(image) {
            toSend = this.uploadService.uploadImage(data, image, 'photo')
        } else {
            toSend = data
        }
        return this.http.patch(this.url + 'updateMe', toSend, this.getToken())
    }
}