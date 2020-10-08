import db from '../models';
// import * as sgMail from '@sendgrid/mail';
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import * as nodeMailer from 'nodemailer';

const User = db.user;
const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const Template = db.template;
const Package = db.package;
const ZipCode = db.zipCodeModel;

exports.getSuperAdminDashboardValues = async (req, res) => {
    const response = {
        user: await User.count({where: {}}),
        workingGroup: await WorkingGroup.count({where: {}}),
        calendar: await Calendar.count({where: {}}),
        template: await Template.count({where: {}}),
        package: await Package.count({where: {}}),
        appointment: 275
    }
    res.json(response);
};

exports.sendEmail = async (req, res) => {
    const data = req.body;
    console.log(data)
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
    // sgMail.send(option).then(() => {
    //     console.log('Email sends successfully')
    // }).catch((e) => {
    //     console.log(e)
    // });
    res.status(200).json({});
}

exports.checkPostalCode = async (req, res) => {
    const zipcodeModel = await ZipCode.findOne({where: {plz: req.params.code}, raw: true,});
    res.status(200).json(zipcodeModel)
}

exports.getPostalCodeByName = async (req, res) => {

}

