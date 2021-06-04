export class Tour {
    _id: number | string
    name: string
    maxGroupSize: Number
    duration: Number
    difficulty: String
    price: Number
    summary: String
    startDate: Array<Date>
    startLocation: Object
    locations: Object

    constructor(details: any) {
        this.name = details.name || ''
        this.maxGroupSize = details.maxGroupSize || ''
        this.duration = details.duration || ''
        this.difficulty = details.difficulty || ''
        this.price = details.price || ''
        this.summary = details.summary || ''
        this.startDate = details.startDate || ''
       this.startLocation = {
           x: details.startLocation
       }
       this.locations =  {
               y: details.locations
           }
    }
}