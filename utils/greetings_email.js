let sendGridMail = require('@sendgrid/mail')
let sendGridAPIKey = process.env.SENDGRID_API_KEY

sendGridMail.setApiKey(sendGridAPIKey)

sendWelcomeMail = async (name, email) => {
    try {
        await sendGridMail.send({
            to: email,
            from: 'arpited7@gmail.com',
            subject: 'thanks for joining!',
            text: `hey, ${name}, welcome to natours. hope you're good.`
        })
    } catch (e) {
        console.log(e)
    }
}

sendByeByeMail = async (name, email) => {
    try {
        await sendGridMail.send({
            to: email,
            from: 'arpited7@gmail.com',
            subject: 'sorry youre leaving fam!',
            text: `hey, ${name}, bye bye from natours. what did we do wrong?!.`
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    sendWelcomeMail, sendByeByeMail
}