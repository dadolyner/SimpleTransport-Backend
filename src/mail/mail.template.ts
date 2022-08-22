// Reset email template
const MailTemplate = (first_name: string, last_name: string, resetLink: string) => {
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
                <tr><td><h3 style="font-size: 16px"><span style="font-weight: 200">Dear </span>${first_name} ${last_name}<span style="font-weight: 200">,</span></h3></td></tr>
                <tr><p style="margin:0">You have requested a password change.</p></tr>
                
                <tr><p style="margin:0">Please click on the link below to change your password.</p></tr>
                <tr><td>&nbsp;</td></tr>
                <tr><a href="${resetLink}">Change password</a></tr>
            </table>
        </body>
        </html>
    `
}

export default MailTemplate