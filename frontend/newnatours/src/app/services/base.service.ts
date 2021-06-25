import { HttpHeaders } from "@angular/common/http"
import { environment } from "src/environments/environment"


export class BaseService {
    url
    constructor(postUrl) {
        this.url = environment.BaseUrl + postUrl + '/'
    }
    setHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
    }
 }
 setHeadersWithToken() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        }
}   
getToken() {
    return {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
    }
}
}