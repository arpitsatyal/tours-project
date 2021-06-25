export class User {
    name: string
    password: string
    email: string
    photo: string
    constructor(details: any) {
        this.name = details.name || ''
        this.password = details.password || ''
        this.email = details.email || ''
        this.photo = details.photo || ''
    }
}