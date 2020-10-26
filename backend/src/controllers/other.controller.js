import db from '../models';
import Axios from 'axios';
import {sendMail} from '../helper/email';

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
    const SMSData = {
        recipientAddressList: ['8613124260482'],
        messageContent: 'example message content',
    };
    Axios({
        method: 'POST',
        url: 'https://api.websms.com/rest/smsmessaging/text',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'api.websms.com',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + process.env.SMS_BASIC_TOKEN
        },
        data: SMSData
    }).then(res => {
        console.log(res);
    })
}

