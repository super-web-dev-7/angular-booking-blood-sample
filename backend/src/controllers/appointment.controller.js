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
        await ContactHistory.create({type: 'Offene Termine', appointmentId: data.id});
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        });
    });
}

exports.get = async (req, res) => {
    const allAppointment = await Appointment.findAll({where: {archive: false}, include: [User, Package, Agency], raw: true, nest: true});
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
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.nurseStatus AS nurseStatus,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode, 
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
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.nurseStatus AS nurseStatus, appointments.adminStatus AS adminStatus,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode, 
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
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.nurseStatus AS nurseStatus, appointments.adminStatus AS adminStatus,
            users.id AS patientId, users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.id AS patientDetailId, patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode, 
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

exports.getAppointmentWithNurseInfo = async (req, res) => {
    const appointments = await sequelize.query(`
        SELECT appointments.id AS id, 
                patient.id AS patientId, patient.email AS patientEmail, patient.phoneNumber AS patientPhoneNumber,
                nurse.id AS nurseId, nurse.email AS nurseEmail, nurse.phoneNumber AS nursePhoneNumber
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users AS patient ON appointments.userId=patient.id
        JOIN patients ON patients.user_id=patient.id
        JOIN packages ON appointments.packageId=packages.id
        JOIN users AS nurse ON calendars.nurse=nurse.id
        WHERE appointments.id=${req.params.appointmentId}
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(appointments.length > 0 ? appointments[0] : null);
}

exports.getAppointmentsByAnamnes = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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
        WHERE appointments.anamnesisStatus="open" AND appointments.archive=0
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentWithQuestionById = async (req, res) => {
    const id = req.params.id;
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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

exports.appointmentStatusByNurse = async (req, res) => {
    const id = req.params.id;
    await Appointment.update(req.body, {where: {id}});
    res.status(200).json({id, nurseStatus: req.body.nurseStatus});
}

exports.getAppointmentsByAnamnesArchived = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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
        WHERE appointments.callbackStatus=1 AND appointments.archive=0
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentWithCallbackById = async (req, res) => {
    const id = req.params.id;
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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

exports.getAppointmentsWithArchivedCallback = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
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
        WHERE appointments.callbackStatus=1 AND appointments.archive=1
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentsWithoutArchived = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
            packages.name AS packageName,
            calendars.duration_appointment AS duration, agencies.doctors_id AS doctorsId
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.archive=0 AND appointments.callbackStatus=0 AND anamnesisStatus="closed"
    `, {type: Sequelize.QueryTypes.SELECT});
    const response = [];
    for (const appointment of allAppointment) {
        const doctors_id = JSON.parse(appointment.doctorsId);
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
        response.push({...appointment, doctors});
    }
    res.status(200).json(response);
}

exports.getAppointmentsDetailWithoutArchived = async (req, res) => {
    const appointmentId = req.params.id;
    const appointmentResult = await sequelize.query(`
        SELECT res.id, res.appointmentId, res.pressure, res.pulse, res.oxygen, res.height, res.weight, res.content,
            users.firstName, users.lastName, users.id AS userId
        FROM appointment_results AS res
        JOIN users ON res.nurseId=users.id
        WHERE res.appointmentId=${appointmentId} AND res.isActive=1
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.status(200).json(appointmentResult);
}

exports.getAppointmentsWithArchived = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.adminStatus AS adminStatus,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
            packages.name AS packageName,
            calendars.duration_appointment AS duration, agencies.doctors_id AS doctorsId
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id
        WHERE appointments.archive=1
    `, {type: Sequelize.QueryTypes.SELECT});
    const response = [];
    for (const appointment of allAppointment) {
        const doctors_id = JSON.parse(appointment.doctorsId);
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
        response.push({...appointment, doctors});
    }
    res.status(200).json(response);
}

exports.analysisByAgency = async (req, res) => {
    let query = ''
    if (req.query.from) {
        let date = new Date(parseInt(req.query.from, 10));
        date = date.toISOString();
        query = `WHERE appointments.createdAt >= DATE('${date}') `;
    }
    if (req.query.to) {
        let date = new Date(parseInt(req.query.to, 10));
        date = date.toISOString();
        if (query) {
            query += `AND appointments.createdAt <= DATE('${date}') `;
        } else {
            query = `WHERE appointments.createdAt <= DATE('${date}') `;
        }
    }

    if (req.query.agency && req.query.agency !== '0') {
        if (query) {
            query += `AND appointments.agencyId=${req.query.agency} `;
        } else {
            query = `WHERE appointments.agencyId=${req.query.agency} `;
        }
    }

    const allAgencies = await db.sequelize.query(`
        SELECT 
            appointments.agencyId AS agencyId, agencies.name AS agencyName,
            COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
            COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
            COALESCE(SUM(appointments.adminStatus="canceled"), 0) AS cancel_count,
            COALESCE(SUM(appointments.adminStatus="successful"), 0) AS success_count            
        FROM appointments
        JOIN agencies ON agencies.id=appointments.agencyId
        ${query}
        GROUP BY appointments.agencyId
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const totalValue = await db.sequelize.query(`
        SELECT
            COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
            COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
            COALESCE(SUM(appointments.adminStatus="canceled"), 0) AS cancel_count,
            COALESCE(SUM(appointments.adminStatus="successful"), 0) AS success_count   
        FROM appointments
        ${query}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const response = {
        total: totalValue[0],
        agency: allAgencies
    };
    res.json(response);
}

exports.analysisByPackage = async (req, res) => {
    const response = await db.sequelize.query(`
        SELECT 
            appointments.packageId AS packageId, packages.name AS packageName,
            COUNT(appointments.id) AS count_by_package
        FROM appointments
        JOIN packages ON packages.id=appointments.packageId
        GROUP BY appointments.packageId
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.analysisPerMonth = async (req, res) => {
    const response = await db.sequelize.query(`
        SELECT 
            MONTH(appointments.createdAt) AS MONTH, 
            CONVERT(IFNULL(SUM(CASE WHEN appointments.adminStatus="upcoming" THEN 1 END), 0), UNSIGNED INTEGER) AS positive_value, 
            CONVERT(IFNULL(SUM(CASE WHEN appointments.adminStatus="successful" THEN 1 END), 0), UNSIGNED INTEGER) AS negative_value
        FROM appointments
        WHERE appointments.createdAt >= CURDATE() - INTERVAL 6 MONTH
        GROUP BY MONTH(appointments.createdAt)
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.analysisPerMonthWithComplete = async (req, res) => {
    const response = await db.sequelize.query(`
        SELECT MONTH(appointments.createdAt) AS MONTH, COUNT(*) AS count_per_month
        FROM appointments
        WHERE appointments.createdAt >= CURDATE() - INTERVAL 6 MONTH AND appointments.adminStatus="successful"
        GROUP BY MONTH(appointments.createdAt)
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.analysisTotalPatient = async (req, res) => {
    const allPatientCountPerMonth = await db.sequelize.query(`
        SELECT MONTH(createdAt) as month, COUNT(*) as count_per_month
        FROM users
        WHERE createdAt >= CURDATE() - INTERVAL 6 MONTH AND role="Patient"
        GROUP BY MONTH(createdAt)
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const allPatientCount = await db.sequelize.query(`
        SELECT COUNT(id) as all_patient_count FROM users WHERE role="Patient"
    `, {type: db.sequelize.QueryTypes.SELECT});
    const response = {
        all: allPatientCount[0],
        per_patient: allPatientCountPerMonth
    };
    res.json(response);
}