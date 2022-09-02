// Rent a car template
const RentMailTemplate = (userThatRented: any, userThatOwns: any, car: string, start_date: string, end_date: string) => {
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
                <tr><td><h3 style="font-size: 16px"><span style="font-weight: 200">Dear </span>${userThatOwns.first_name} ${userThatOwns.last_name}<span style="font-weight: 200">,</span></h3></td></tr>
                
                <tr><p style="margin:0">${userThatRented.first_name} ${userThatRented.last_name} just reserved your ${car} between ${new Date(start_date).toLocaleDateString()} and ${new Date(end_date).toLocaleDateString()}</p></tr>
                <tr><p style="margin:0">If you have different plans for this car in selected time period you can contact the user on <span style="font-weight:bold">${userThatRented.email}</span></p></tr>
                
                <tr><td>&nbsp;</td></tr>
                <tr><p style="margin:0">Best regards,</p></tr>
                <tr><p style="margin:0">Simple Transport Team</p></tr>
            </table>
        </body>
        </html>
    `
}

export default RentMailTemplate