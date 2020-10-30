import * as nodeMailer from "nodemailer";

/*
email_data = {
    email: 'test@gmail.com',
    subject: 'subject',
    content: 'email content'
}
*/

export const sendMail = async (data) => {
    const option = {
        to: data.email,
        subject: data.subject,
        from: process.env.OWNER_EMAIL,
        html: data.content
    }
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        debug: true,
        logger: true
    });
    return await transporter.sendMail(option).then(async result => {
        console.log('result >>>> ', result);
        return true;
    }).catch(async error => {
        console.log('error >>>> ', error);
        return false;
    });
    // return await transporter.sendMail(option, function (err, result) {
    //     if (err) {
    //         console.log('error >>> ', err)
    //         return false;
    //     }
    //     console.log('result >>> ', result)
    //     return true;
    //
    // })
}