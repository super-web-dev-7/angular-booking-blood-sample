import db from '../models';
import {sendMail} from '../helper/email';
import {sendSMS} from '../helper/sms';
import cron from 'node-cron';

const User = db.user;
const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const Template = db.template;
const Package = db.package;
const Appointment = db.appointment;
// const ZipCode = db.zipCodeModel;
const DistrictModel = db.districtModel;
const AppointmentResult = db.appointmentResult;

exports.getSuperAdminDashboardValues = async (req, res) => {
    const response = {
        user: await User.count({where: {}}),
        workingGroup: await WorkingGroup.count({where: {}}),
        calendar: await Calendar.count({where: {}}),
        template: await Template.count({where: {}}),
        package: await Package.count({where: {}}),
        appointment: await Appointment.count({where: {}})
    }
    res.json(response);
};

exports.getAgAdminDashboardValues = async (req, res) => {
    const allAgencies = await db.sequelize.query(`
        SELECT 
            appointments.agencyId AS agencyId, agencies.name AS agencyName,
            COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
            COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
            COALESCE(SUM(appointments.adminStatus="confirmed" OR appointments.adminStatus="upcoming"), 0) AS total_count
        FROM appointments
        JOIN agencies ON agencies.id=appointments.agencyId
        GROUP BY appointments.agencyId
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const totalValue = await db.sequelize.query(`
        SELECT 
            COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
            COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
            COALESCE(SUM(appointments.adminStatus="confirmed" OR appointments.adminStatus="upcoming"), 0) AS total_count
        FROM appointments
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const response = {
        total: totalValue[0],
        agency: allAgencies
    };
    res.json(response);
}

exports.sendEmail = async (req, res) => {
    const data = req.body;
    await sendMail(data);
    res.status(200).json({});
}

exports.checkPostalCode = async (req, res) => {
    const district = await DistrictModel.findOne({where: {zipcode: req.params.code}, raw: true});
    res.status(200).json(district)
}

exports.getPostalCodeByName = async (req, res) => {

}

exports.sendSMS = async (req, res) => {
    const data = req.body;
    const response = await sendSMS(data);
    console.log(response);
    res.status(200).json(response);
}

exports.getSmsHistory = async (req, res) => {
    const response = await db.sequelize.query(`
        SELECT sms.id, sms.subject, sms.phoneNumber, sms.status, sms.content, sms.createdAt, users.firstName, users.lastName
        FROM sms_histories sms
        JOIN users ON sms.receiver=users.id
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.appointmentDelay = async (req, res) => {
    const smsData = req.body.smsData;
    const smsResult = await sendSMS(smsData);
    res.status(200).json({smsResult});
}

exports.appointmentShift = async (req, res) => {
    const emailData = req.body.emailData;
    const smsData = req.body.smsData;
    const emailResult = await sendMail(emailData);
    const smsResult = await sendSMS(smsData);
    res.status(200).json({emailResult, smsResult});
}

exports.appointmentTaken = async (req, res) => {
    const emailData = req.body.emailData;
    const emailResult = await sendMail(emailData);
    const data = req.body.data;
    await AppointmentResult.update({isActive: false}, {where: {appointmentId: data.appointmentId}});
    await AppointmentResult.create(data);
    res.status(200).json({emailResult});
}

exports.appointmentNotThere = async (req, res) => {
    const emailData = req.body.emailData;
    const smsData = req.body.smsData;
    const emailResult = await sendMail(emailData);
    const smsResult = await sendSMS(smsData);
    res.status(200).json({emailResult, smsResult});
}

cron.schedule('* * * * *', async function () {
    console.log('----------------Running cron jobs ----------------');
    const now = new Date();
    const currentMillisecond = now.getTime();
    console.log(currentMillisecond);
    const template1 = await Template.findOne({where: {assign: '60 minutes before Appointment'}, raw: true});
    const template2 = await Template.findOne({where: {assign: '24 hours before Appointment'}, raw: true});
    const allAppointments = await db.sequelize.query(`
        SELECT a.id, a.name, a.time, users.id AS userId, users.phoneNumber 
        FROM appointments AS a
        JOIN users ON a.userId=users.id
    `, {type: db.Sequelize.QueryTypes.SELECT});
    let appointment60 = [];
    let appointment24 = [];
    for (const appointment of allAppointments) {
        if (3600 * 1000 - 60 * 1000 <= appointment.time - currentMillisecond
            && appointment.time - currentMillisecond < 3600 * 1000) {
            appointment60.push(appointment);
            await sendSMS({
                subject: '60 minutes before Appointment',
                receiver: appointment.userId,
                phoneNumber: appointment.phoneNumber,
                content: template1.message
            });
        }
        if (24 * 3600 * 1000 - 60 * 1000 <= appointment.time - currentMillisecond
            && appointment.time - currentMillisecond < 24 * 3600 * 1000) {
            appointment24.push(appointment);
            await sendSMS({
                subject: '24 hours before Appointment',
                receiver: appointment.userId,
                phoneNumber: appointment.phoneNumber,
                content: template2.message
            });
        }
    }
    console.log(appointment60);
    console.log(appointment24);
    // console.log(allAppointments);
});