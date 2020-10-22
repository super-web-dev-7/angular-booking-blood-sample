import db from '../models';
import Sequelize from "sequelize";

const Appointment = db.appointment;
const Package = db.package;
const User = db.user;
const Agency = db.agency;
const Patient = db.patient;
const ContactHistory = db.contactHistory;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
    const newAppointment = req.body;
    Appointment.create(newAppointment).then(async data => {
        await ContactHistory.create({type: 'upcoming', appointmentId: data.id});
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        });
    });
}

exports.get = async (req, res) => {
    const allAppointment = await Appointment.findAll({where: {}, include: [User, Package, Agency], raw: true, nest: true});
    let response = [];
    for (const appointment of allAppointment) {
        const doctors_id = JSON.parse(appointment.agency.doctors_id);
        const doctors = [];
        for (const id of doctors_id) {
            const doctor = await User.findByPk(id);
            doctors.push({
                id: doctor.id,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                email: doctor.email,
                phoneNumber: doctor.phoneNumber
            });
        }
        const nurse = await sequelize.query(`
        SELECT users.id, users.email, users.firstName, users.lastName, users.phoneNumber FROM users
        JOIN calendars ON users.id = calendars.nurse
        JOIN working_groups ON working_groups.calendar_id = calendars.id
        JOIN working_group_agencies ON working_group_agencies.groupId=working_groups.id
        JOIN agencies ON agencies.id=working_group_agencies.agencyId
        WHERE working_group_agencies.agencyId = ${appointment.agency.id}
        `, {type: Sequelize.QueryTypes.SELECT});
        const patient = await Patient.findOne({where: {user_id: appointment.user.id}});
        response.push({...appointment, doctors, patient, nurse: nurse[0]})
    }
    res.status(200).json(response);
}

exports.delete = async (req, res) => {
    Appointment.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
}

exports.getAppointmentByNurse = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.ready AS ready,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt, 
            packages.id AS packageId, packages.name AS packageName,
            calendars.id AS calendarId, calendars.duration_appointment AS duration, calendars.working_time_from AS workingTimeFrom, calendars.working_time_until AS workingTimeUntil
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE calendars.nurse=${req.params.id}
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentByPatient = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.ready AS ready, appointments.adminStatus AS adminStatus,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt, 
            packages.id AS packageId, packages.name AS packageName,
            calendars.id AS calendarId, calendars.duration_appointment AS duration
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.userId=${req.params.id}
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentDetail = async (req, res) => {
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.ready AS ready, appointments.adminStatus AS adminStatus,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt, 
            packages.id AS packageId, packages.name AS packageName,
            calendars.id AS calendarId, calendars.duration_appointment AS duration
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.id=${req.params.id}
    `, {type: Sequelize.QueryTypes.SELECT});
    const response = appointment.length > 0 ? appointment[0] : null;
    res.status(200).json(response);
}

exports.getAppointmentsByAnamnes = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            packages.name AS packageName,
            calendars.duration_appointment AS duration
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.anamnesisStatus="open"
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentWithQuestionById = async (req, res) => {
    const id = req.params.id;
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            packages.name AS packageName,
            calendars.duration_appointment AS duration,
            medical_questions.*,
            callback_doctors.id AS callbackId, callback_doctors.date AS callbackDate, callback_doctors.time AS callbackTime, callback_doctors.phoneNumber AS callbackPhoneNumber,
            callback_doctors.schedule AS callbackSchedule, callback_doctors.message AS callbackMessage
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        JOIN medical_questions ON appointments.id=medical_questions.appointmentId
        LEFT JOIN callback_doctors ON callback_doctors.appointmentId=appointments.id
        WHERE medical_questions.isActive=1 AND appointments.id=${id}
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(appointment);
}

exports.appointmentReady = async (req, res) => {
    const id = req.params.id;
    await Appointment.update(req.body, {where: {id}});
    res.status(200).json({id, ready: req.body.ready});
}

exports.getAppointmentsByAnamnesArchived = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            packages.name AS packageName,
            calendars.duration_appointment AS duration
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.anamnesisStatus="open" AND appointments.archive=1
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentsWithActiveCallback = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            packages.name AS packageName,
            calendars.duration_appointment AS duration
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.callbackStatus=1
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentWithCallbackById = async (req, res) => {
    const id = req.params.id;
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            packages.name AS packageName,
            calendars.duration_appointment AS duration,
            callback_doctors.*
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id        
        JOIN callback_doctors ON callback_doctors.appointmentId=appointments.id
        WHERE appointments.id=${id}
    `, {type: Sequelize.QueryTypes.SELECT});
    const response = appointment.length > 0 ? appointment[0] : null;
    res.status(200).json(response);
}
