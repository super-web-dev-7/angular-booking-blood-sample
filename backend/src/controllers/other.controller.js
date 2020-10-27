import db from '../models';
import Axios from 'axios';
import {sendMail} from '../helper/email';
import {sendSMS} from "../helper/sms";

const User = db.user;
const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const Template = db.template;
const Package = db.package;
const Appointment = db.appointment;
const ZipCode = db.zipCodeModel;

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
    const zipcodeModel = await ZipCode.findOne({where: {plz: req.params.code}, raw: true,});
    res.status(200).json(zipcodeModel)
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
