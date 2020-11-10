import Sequelize from 'sequelize';
import {v1 as UUID} from 'uuid';
import db from '../models';
import {call} from "../helper/laboratory";


const Appointment = db.appointment;
const Package = db.package;
const User = db.user;
const Agency = db.agency;
const Patient = db.patient;
const ContactHistory = db.contactHistory;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
    let newAppointment = req.body;
    const engagementID = UUID();
    newAppointment = {...newAppointment, engagementID };
    Appointment.create(newAppointment).then(async data => {
        await ContactHistory.create({type: 'appointment_created', appointmentId: data.id});
        const patients = await sequelize.query(`
            SELECT * FROM users JOIN patients ON patients.user_id=users.id WHERE users.id=${data.userId}
        `, {type: Sequelize.QueryTypes.SELECT});
        const patient = patients[0];
        const workingGroupAgency = await db.workingGroupAgency.findOne({where: {agencyId: data.agencyId}, raw: true});
        const schema = {
            url: '/engagement',
            method: 'PUT',
            body: {
                engagementID,
                patientID: data.userId.toString(),
                workingGroupID: workingGroupAgency.groupId.toString(),
                profileID: 'gbb',
                appointment: new Date(),
                pFirstName: patient.firstName,
                pLastName: patient.lastName,
                pDateOfBirth: new Date(patient.age),
                pEmail: patient.email,
                pAddress: patient.street,
                pPostalCode: patient.plz.toString(),
                pCity: patient.ort,
                pCountryCode: 'DE',
                pGender: patient.gender === 'Male' ? 'm' : 'f',
                pAnamnesis: {}
            }
        };
        console.log(schema);
        await call(schema);
        res.status(201).json(data);
    }).catch(e => {
        console.log(e);
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        });
    });
}

exports.createByPatient = async (req, res) => {
    const additionalInfo = {
        additionalPackageId: req.body.additionalPackageId,
        payment: req.body.payment,
        message: req.body.message
    };

    const data = {
        packageId: req.body.packageId,
        name: req.body.plz,
        userId: req.body.userId,
        time: req.body.time
    };

    const districtModel = await db.districtModel.findOne({where: {zipcode: req.body.plz}, raw: true});
    if (!districtModel) {
        res.status(400).json({message: 'Wrong zipcode'});
        return;
    }
    const district = await db.district.findOne({where: {city: 'Berlin', district: districtModel.district}, raw: true});
    if (!district) {
        res.status(400).json({message: 'cannot find district'});
        return;
    }
    let calendar;
    const calendars = await db.calendar.findAll({raw: true, nest: true});
    for (const item of calendars) {
        const districtIds = JSON.parse(item.district_id);
        if (districtIds.includes(district.id)) {
            calendar = item;
        }
    }

    if (!calendar) {
        res.status(400).json({message: 'cannot find calendar'});
        return;
    }
    const countByAgency = await db.sequelize.query(`
        SELECT COUNT(a.id) AS COUNT, working_group_agencies.agencyId
        FROM appointments a
        RIGHT JOIN working_group_agencies ON working_group_agencies.agencyId=a.agencyId
        JOIN working_groups ON working_groups.id=working_group_agencies.groupId
        JOIN calendars ON working_groups.calendar_id=calendars.id
        WHERE calendars.id=${calendar.id}
        GROUP BY a.agencyId
        ORDER BY COUNT
    `, {type: db.Sequelize.QueryTypes.SELECT});

    if (countByAgency.length > 0) {
        const engagementID = UUID();
        data.agencyId = countByAgency[0].agencyId;
        data.engagementID = engagementID;
        const newAppointment = await Appointment.create(data);
        additionalInfo.appointmentId = newAppointment.id;
        await db.appointmentExtraInformation.create(additionalInfo);
        res.status(200).json({message: 'success', newAppointment});
    } else {
        res.status(400).json({message: 'cannot find agency'});
    }
}

exports.get = async (req, res) => {
    const allAppointment = await Appointment.findAll({
        where: {archive: false},
        include: [User, Package, Agency],
        raw: true,
        nest: true
    });
    let response = [];
    for (const appointment of allAppointment) {
        let reason = null;
        if (appointment.adminStatus === 'canceled') {
            reason = await db.appointmentCancelReason.findOne({where: {appointmentId: appointment.id}, raw: true});
        }
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
        response.push({...appointment, doctors, patient, nurse: nurse[0], reason});
    }
    res.status(200).json(response);
}

exports.delete = async (req, res) => {
    Appointment.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    });
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
        WHERE calendars.nurse=${req.params.id} AND appointments.nurseStatus!="initial" AND appointments.adminStatus!="canceled"
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allAppointment);
}

exports.getAppointmentByPatient = async (req, res) => {
    const allAppointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.nurseStatus AS nurseStatus, appointments.adminStatus AS adminStatus, appointments.agencyId AS agencyId,
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
        WHERE appointments.userId=${req.params.id} AND appointments.archive=0
    `, {type: Sequelize.QueryTypes.SELECT});
    const response = [];
    for (const appointment of allAppointment) {
        const medicalQuestion = await db.medicalQuestion.findOne({where: {appointmentId: appointment.id}, raw: true});
        response.push({...appointment, medicalQuestion});
    }
    res.status(200).json(response);
}

exports.getAppointmentDetail = async (req, res) => {
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime, appointments.nurseStatus AS nurseStatus, appointments.adminStatus AS adminStatus, appointments.agencyId AS agencyId,
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
                nurse.id AS nurseId, nurse.email AS nurseEmail, nurse.phoneNumber AS nursePhoneNumber,
                nurse.firstName AS nurseFirstName, nurse.lastName AS nurseLastName
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users AS patient ON appointments.userId=patient.id
        JOIN patients ON patients.user_id=patient.id        
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
    if (req.body.nurseStatus === 'taken') {
        await Appointment.update({...req.body, adminStatus: 'successful'}, {where: {id}});
    } else {
        await Appointment.update(req.body, {where: {id}});
    }
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
    const appointments = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
            users.firstName AS patientFirstName, users.lastName AS patientLastName, users.email AS patientEmail, users.phoneNumber AS patientNumber, 
            patients.street AS addressStreet, patients.plz AS addressPlz, patients.ort AS addressOrt,
            patients.differentPlace, patients.otherStreet, patients.otherCity, patients.otherPostalCode,
            packages.name AS packageName,
            calendars.duration_appointment AS duration,
            callback_doctors.*,
            callback_answers.callbackId AS answeredCallbackId
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users ON appointments.userId=users.id
        JOIN patients ON patients.user_id=users.id
        JOIN packages ON appointments.packageId=packages.id        
        JOIN callback_doctors ON callback_doctors.appointmentId=appointments.id
        LEFT JOIN callback_answers ON callback_answers.callbackId=callback_doctors.id
        WHERE appointments.id=${id}
        ORDER BY callback_doctors.createdAt DESC
    `, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(appointments);
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

const getWorkingGroupFromAdmin = async id => {
    const userId = parseInt(id);
    const workingGroups = await db.workingGroup.findAll({raw: true});
    let value;
    for (const workingGroup of workingGroups) {
        const admins = JSON.parse(workingGroup.admin);
        if (admins.includes(userId)) {
            value = workingGroup;
            break;
        }
    }
    return value;
}

exports.analysisByAgency = async (req, res) => {
    const userId = req.params.userId;
    const workingGroup = await getWorkingGroupFromAdmin(userId);
    let query = `WHERE working_group_agencies.groupId = ${workingGroup.id} `;
    if (req.query.from) {
        let date = new Date(parseInt(req.query.from, 10));
        date = date.toISOString();
        query += `AND appointments.createdAt >= DATE('${date}') `;
    }
    if (req.query.to) {
        let date = new Date(parseInt(req.query.to, 10));
        date = date.toISOString();
        query += `AND appointments.createdAt <= DATE('${date}') `;
    }

    if (req.query.agency && req.query.agency !== '0') {
        query += `AND appointments.agencyId=${req.query.agency} `;
    }

    console.log(query);

    const allAgencies = await db.sequelize.query(`
        SELECT 
            appointments.agencyId AS agencyId, agencies.name AS agencyName,
            COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
            COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
            COALESCE(SUM(appointments.adminStatus="canceled"), 0) AS cancel_count,
            COALESCE(SUM(appointments.adminStatus="successful"), 0) AS success_count            
        FROM appointments
        JOIN agencies ON agencies.id=appointments.agencyId
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id        
        ${query}
        GROUP BY appointments.agencyId
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const totalValue = await db.sequelize.query(`
            SELECT
                COALESCE(SUM(appointments.adminStatus="upcoming"), 0) AS open_date_count,
                COALESCE(SUM(appointments.adminStatus="confirmed"), 0) AS confirm_count,
                COALESCE(SUM(appointments.adminStatus="canceled"), 0) AS cancel_count,
                COALESCE(SUM(appointments.adminStatus="successful"), 0) AS success_count,
                MAX(appointments.createdAt) AS max_date, MIN(appointments.createdAt) AS min_date
            FROM appointments
            JOIN agencies ON agencies.id=appointments.agencyId
            JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id    
        ${query}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const response = {
        total: totalValue[0],
        agency: allAgencies
    };
    res.json(response);
}

exports.analysisByPackage = async (req, res) => {
    const userId = req.params.userId;
    const workingGroup = await getWorkingGroupFromAdmin(userId);
    const response = await db.sequelize.query(`
        SELECT 
            appointments.packageId AS packageId, packages.name AS packageName,
            COUNT(appointments.id) AS count_by_package
        FROM appointments
        JOIN packages ON packages.id=appointments.packageId
        JOIN agencies ON agencies.id=appointments.agencyId
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        WHERE working_group_agencies.groupId=${workingGroup.id}
        GROUP BY appointments.packageId
    `, {type: db.Sequelize.QueryTypes.SELECT});
    res.json(response);
}

exports.analysisPerMonth = async (req, res) => {
    const userId = req.params.userId;
    const workingGroup = await getWorkingGroupFromAdmin(userId);
    const response = await db.sequelize.query(`
        SELECT 
            MONTH(appointments.createdAt) AS MONTH, 
            CONVERT(IFNULL(SUM(CASE WHEN appointments.adminStatus="upcoming" THEN 1 END), 0), UNSIGNED INTEGER) AS positive_value, 
            CONVERT(IFNULL(SUM(CASE WHEN appointments.adminStatus="successful" THEN 1 END), 0), UNSIGNED INTEGER) AS negative_value
        FROM appointments
        JOIN agencies ON agencies.id=appointments.agencyId
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        WHERE appointments.createdAt >= CURDATE() - INTERVAL 6 MONTH AND working_group_agencies.groupId=${workingGroup.id}
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
    const userId = req.params.userId;
    const workingGroup = await getWorkingGroupFromAdmin(userId);
    const allPatientCountPerMonth = await db.sequelize.query(`
        SELECT month_label, COUNT(*) AS patient_per_month FROM (SELECT a.userId, MONTH(a.createdAt) AS month_label
        FROM appointments AS a
        JOIN working_group_agencies AS w ON w.agencyId=a.agencyId
        WHERE w.groupId=${workingGroup.id} AND a.createdAt >= CURDATE() - INTERVAL 6 MONTH
        GROUP BY a.userId) t GROUP BY month_label
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const allPatientCount = await db.sequelize.query(`
        SELECT COUNT(*) AS all_patient FROM (SELECT a.userId, MONTH(a.createdAt) AS month_label
        FROM appointments AS a
        JOIN working_group_agencies AS w ON w.agencyId=a.agencyId
        WHERE w.groupId=${workingGroup.id} AND a.createdAt >= CURDATE() - INTERVAL 6 MONTH
        GROUP BY a.userId) t 
    `, {type: db.sequelize.QueryTypes.SELECT});
    const response = {
        all: allPatientCount[0],
        per_patient: allPatientCountPerMonth
    };
    res.json(response);
}