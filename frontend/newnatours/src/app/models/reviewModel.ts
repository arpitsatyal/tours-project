export class Review {
    review: string
    rating: number
    tour: string
    user: string
    constructor(details: any) {
        this.review = details.review
        this.rating = details.rating
        this.tour = details.tour || ''
        this.user = details.user || ''
    }
}