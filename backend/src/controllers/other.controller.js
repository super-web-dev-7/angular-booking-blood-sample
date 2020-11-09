import cron from 'node-cron';
import db from '../models';
import {sendMail} from '../helper/email';
import {sendSMS} from '../helper/sms';

const User = db.user;
const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const Template = db.template;
const Package = db.package;
const Appointment = db.appointment;
const ZipCode = db.zipCodeModel;
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

exports.checkPostalCodeAll = async (req, res) => {
    const district = await ZipCode.findOne({where: {plz: req.params.code}, raw: true});
    res.status(200).json(district);
}

exports.checkPostalCodeForAppointment = async (req, res) => {
    const zipcode = req.params.code;
    const districtModel = await db.districtModel.findOne({where: {zipcode}, raw: true});
    if (!districtModel) {
        res.status(200).json(null);
        return;
    }
    const district = await db.district.findOne({where: {city: 'Berlin', district: districtModel.district}});
    if (!district) {
        res.status(200).json(null);
        return;
    }
    let calendar = null;
    const calendars = await Calendar.findAll({raw: true});
    for (const item of calendars) {
        const districtIds = JSON.parse(item.district_id);
        if (districtIds.includes(district.id)) {
            calendar = item;
            break;
        }
    }
    if (calendar) {
        res.status(200).json(districtModel);
    } else {
        res.status(200).json(null);
    }
}

exports.getAvailableZipCodeByAgency = async (req, res) => {
    const agencyId = req.params.agencyId;
    const response = [];
    const calendars = await db.sequelize.query(`
        SELECT * FROM calendars
        JOIN working_groups ON working_groups.calendar_id=calendars.id
        JOIN working_group_agencies ON working_group_agencies.groupId=working_groups.id
        WHERE working_group_agencies.agencyId=${agencyId}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const calendar = calendars.length > 0 ? calendars[0] : null;
    const districtIds = JSON.parse(calendar.district_id);
    for (const districtId of districtIds) {
        const district = await db.district.findOne({where: {id: districtId}, raw: true});
        const districtModels = await DistrictModel.findAll({where: {city: district.city, district: district.district}});
        for (const districtModel of districtModels) {
            response.push(districtModel);
        }
    }

    res.status(200).json(response);
}

exports.sendSMS = async (req, res) => {
    const data = req.body;
    const response = await sendSMS(data);
    res.status(200).json(response);
}

exports.getSmsHistory = async (req, res) => {
    const response = await db.sequelize.query(`
        SELECT sms.id, sms.subject, sms.phoneNumber, sms.status, sms.content, sms.createdAt,
            users.firstName, users.lastName
        FROM sms_histories sms
        JOIN users ON sms.receiver=users.id
        ORDER BY sms.createdAt DESC
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.appointmentDelay = async (req, res) => {
    const smsData = req.body.smsData;
    const smsResult = sendSMS(smsData);
    res.status(200).json({smsResult});
}

exports.appointmentShift = async (req, res) => {
    const emailData = req.body.emailData;
    const smsData = req.body.smsData;
    sendMail(emailData);
    sendSMS(smsData);
    await Appointment.update({adminStatus: 'canceled'}, {where: {id: req.body.appointmentId}});
    await db.appointmentCancelReason.create({
        appointmentId: req.body.appointmentId,
        message: emailData.content,
        type: 'nurse_shift'
    });
    await db.contactHistory.create({appointmentId: req.body.appointmentId, type: 'appointment_cancel'});
    res.status(200).json({message: 'appointment shift'});
}

exports.appointmentTaken = async (req, res) => {
    const emailData = req.body.emailData;
    sendMail(emailData);
    const data = req.body.data;
    // await AppointmentResult.update({isActive: false}, {where: {appointmentId: data.appointmentId}});
    await Appointment.update({adminStatus: 'successful'}, {where: {id: data.appointmentId}});
    await AppointmentResult.create(data);
    res.status(200).json({message: 'appointment taken'});
}

exports.appointmentNotThere = async (req, res) => {
    const emailData = req.body.emailData;
    const smsData = req.body.smsData;
    sendMail(emailData);
    sendSMS(smsData);
    await Appointment.update({adminStatus: 'canceled'}, {where: {id: req.body.appointmentId}});
    await db.appointmentCancelReason.create({
        appointmentId: req.body.appointmentId,
        message: emailData.content,
        type: 'nurse_not_there'
    });
    await db.contactHistory.create({appointmentId: req.body.appointmentId, type: 'appointment_cancel'});
    res.status(200).json({message: 'appointment canceled'});
}

cron.schedule('* * * * *', async function () {
    const appointmentsAfter2H = await db.sequelize.query(`
        SELECT a.*,
            patient.firstName AS patientFirstName, patient.lastName AS patientLastName,
            working_groups.admin AS admins,
            packages.name AS packageName
        FROM appointments AS a
        JOIN users AS patient ON patient.id=a.userId
        JOIN working_group_agencies ON working_group_agencies.agencyId=a.agencyId
        JOIN working_groups ON working_groups.id=working_group_agencies.groupId
        JOIN packages ON packages.id=a.packageId
        WHERE a.anamnesisStatus="open" AND 
            a.nurseStatus="initial" AND 
            a.adminStatus="upcoming" AND 
            a.createdAt <= DATE_SUB(NOW(), INTERVAL 2 HOUR) AND 
            (a.id NOT IN (
                SELECT appointmentId FROM medical_question_reminders AS m WHERE m.type = '2h'
            ))
    `, {type: db.Sequelize.QueryTypes.SELECT});
    for (const appointment of appointmentsAfter2H) {
        console.log('2h later >>>> id >>>>>>>>>>>> ', appointment.id)
        const adminIds = JSON.parse(appointment.admins);
        db.medicalQuestionReminder.create({appointmentId: appointment.id, type: '2h'});
        for (const adminId of adminIds) {
            const admin = await User.findByPk(adminId, {raw: true});
            const data = {
                email: admin.email,
                subject: '2H',
                content: `Appointment -> id: ${appointment.id}, packageName: ${appointment.packageName}, patient name: ${appointment.patientFirstName} ${appointment.patientLastName}`
            };
            console.log('2h email >>>>>>>>>>>>>> ', admin.email);
            sendMail(data);
        }
    }

    const appointmentsAfter4H = await db.sequelize.query(`
        SELECT a.*,
            patient.firstName AS patientFirstName, patient.lastName AS patientLastName,
            working_groups.admin AS admins,
            packages.name AS packageName
        FROM appointments AS a
        JOIN users AS patient ON patient.id=a.userId
        JOIN working_group_agencies ON working_group_agencies.agencyId=a.agencyId
        JOIN working_groups ON working_groups.id=working_group_agencies.groupId
        JOIN packages ON packages.id=a.packageId
        WHERE a.anamnesisStatus="open" AND 
            a.nurseStatus="initial" AND 
            a.adminStatus="upcoming" AND 
            a.createdAt <= DATE_SUB(NOW(), INTERVAL 4 HOUR) AND 
            (a.id NOT IN (
                SELECT appointmentId FROM medical_question_reminders AS m WHERE m.type = '4h'
            ))
    `, {type: db.Sequelize.QueryTypes.SELECT});
    for (const appointment of appointmentsAfter4H) {
        console.log(' 4h later >>>>>> id >>>>>>>>>>>> ', appointment.id)
        const adminIds = JSON.parse(appointment.admins);
        db.medicalQuestionReminder.create({appointmentId: appointment.id, type: '4h'});
        for (const adminId of adminIds) {
            const admin = await User.findByPk(adminId, {raw: true});
            const data = {
                email: admin.email,
                subject: '4H',
                content: `Appointment -> id: ${appointment.id}, packageName: ${appointment.packageName}, patient name: ${appointment.patientFirstName} ${appointment.patientLastName}`
            };
            console.log('4h email >>>>>>>>>>>>>> ', admin.email);
            sendMail(data);
        }
    }

    const appointmentsAfter24H = await db.sequelize.query(`
        SELECT a.*,
            patient.firstName AS patientFirstName, patient.lastName AS patientLastName,
            working_groups.admin AS admins,
            packages.name AS packageName
        FROM appointments AS a
        JOIN users AS patient ON patient.id=a.userId
        JOIN working_group_agencies ON working_group_agencies.agencyId=a.agencyId
        JOIN working_groups ON working_groups.id=working_group_agencies.groupId
        JOIN packages ON packages.id=a.packageId
        WHERE a.anamnesisStatus="open" AND 
            a.nurseStatus="initial" AND 
            a.adminStatus="upcoming" AND 
            a.createdAt <= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `, {type: db.Sequelize.QueryTypes.SELECT});
    for (const appointment of appointmentsAfter24H) {
        await Appointment.update({adminStatus: 'canceled'}, {where: {id: appointment.id}});
        const adminIds = JSON.parse(appointment.admins);
        for (const adminId of adminIds) {
            const admin = await User.findByPk(adminId, {raw: true});
            const data = {
                email: admin.email,
                subject: 'Termin storniert',
                content: `Appointment -> id: ${appointment.id}, packageName: ${appointment.packageName}, patient name: ${appointment.patientFirstName} ${appointment.patientLastName}`
            };
            console.log('4h email >>>>>>>>>>>>>> ', admin.email);
            sendMail(data);
        }
    }
})

cron.schedule('* * * * *', async function () {
    // console.log('----------------Running cron jobs ----------------');
    const now = new Date();
    const currentMillisecond = now.getTime();
    const template1 = await Template.findOne({where: {assign: 'Terminerinnerung 60 Minuten vorher'}, raw: true});
    const template2 = await Template.findOne({where: {assign: 'Terminerinnerung 24 Stunden vorher'}, raw: true});
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
                subject: 'Terminerinnerung 60 Minuten vorher',
                receiver: appointment.userId,
                phoneNumber: appointment.phoneNumber,
                content: template1.message ? template1.message : '60 min remains until appointment.'
            });
        }
        if (24 * 3600 * 1000 - 60 * 1000 <= appointment.time - currentMillisecond
            && appointment.time - currentMillisecond < 24 * 3600 * 1000) {
            appointment24.push(appointment);
            await sendSMS({
                subject: 'Terminerinnerung 24 Stunden vorher',
                receiver: appointment.userId,
                phoneNumber: appointment.phoneNumber,
                content: template2.message ? template2.message : '24 hours remains until appointment.'
            });
        }
    }
    // console.log(appointment60);
    // console.log(appointment24);
});