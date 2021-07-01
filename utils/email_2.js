module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = `Arpit Satyal <${process.env.EMAIL_FROM}>`
}
    createTransport() {
        if(process.env.NODE_ENV === 'production') {
            return 0
        }  
        return nodemailer.createTransport({
            // service: 'Gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
    })
}
    send() {
    
    }
    sendWelcome() {
        this.send('welcome', 'welcome to natours')
    }
}