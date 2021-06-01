import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class notifyService {
    constructor(
        public toastrService: ToastrService
    ) {

    }
    showSuccess(msg) {
        this.toastrService.success(msg)
    }
    showInfo(msg) {
        this.toastrService.info(msg)
    }
    showError(e) {
        console.log(e)
        if (typeof (e.error.message === 'string' && e.error.message)) {
            this.toastrService.error(e.error.message)
        } else if (e.error.message && typeof (e.error.message === 'object')) {
            this.toastrService.error(e.error.message.errmsg)
        } else
            this.toastrService.error('something went wrong!')
    }
}
