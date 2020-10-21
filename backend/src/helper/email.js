import * as nodeMailer from "nodemailer";

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
    await transporter.sendMail(option, function (err, result) {
        console.log(err)
        console.log(result)
    })
}