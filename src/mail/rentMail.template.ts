// Rent a car template
import moment from 'moment'

const RentMailTemplate = (userThatRented: string, userThatOwns: string, car: string, start_date: string, end_date: string) => {
    return `
        <!DOCTYPE html>

        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password</title>
        </head>

        <body>
            <table>
                <tr><td><h3 style="font-size: 16px"><span style="font-weight: 200">Dear </span>${userThatOwns}<span style="font-weight: 200">,</span></h3></td></tr>
                <tr><td>&nbsp;</td></tr>
                
                <tr><p style="margin:0">${userThatRented} just reserved your ${car} between ${moment(new Date(start_date)).format('DD. MM. YYYY | HH:mm')} and ${moment(new Date(end_date)).format('DD. MM. YYYY | HH:mm')}</p></tr>
                <tr><p style="margin:0">Please click on the link below to change your password.</p></tr>
                
                <tr><td>&nbsp;</td></tr>
                <tr><p style="margin:0">Best regards,</p></tr>
                <tr><p style="margin:0">Simple Transport Team</p></tr>
            </table>
        </body>
        </html>
    `
}

export default RentMailTemplate