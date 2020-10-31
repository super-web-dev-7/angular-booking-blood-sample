import db from '../models';
import {sendMail} from "../helper/email";
import {sendSMS} from "../helper/sms";

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;
const ContactHistory = db.contactHistory;
const CallbackDoctor = db.callbackDoctor;
const Template = db.template;
const Patient = db.patient;

exports.createMedicalQuestion = async (req, res) => {
    await Appointment.update({anamnesisStatus: 'open'}, {where: {id: req.body.appointmentId}});
    const newMedicalQuestion = await MedicalQuestion.create(req.body);
    await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'Arztrückruf angefragt'});
    res.status(201).json(newMedicalQuestion);
}

exports.createCallback = async (req, res) => {
    const newCallbackData = req.body;
    const callback = CallbackDoctor.findOne({where: {appointmentId: newCallbackData.appointmentId}});
    await Appointment.update({callbackStatus: true}, {where: {id: newCallbackData.appointmentId}});
    if (callback) {
        await ContactHistory.create({appointmentId: newCallbackData.appointmentId, type: 'Rückruf aktualisiert'});
        await CallbackDoctor.update(newCallbackData, {where: {appointmentId: newCallbackData.appointmentId}});
        res.status(200).json({
            message: 'updated'
        });
    } else {
        await ContactHistory.create({appointmentId: newCallbackData.appointmentId, type: 'Rückruf erstellt'});
        const newCallback = await CallbackDoctor.create(newCallbackData);
        res.status(201).json(newCallback);
    }
}

exports.cancelAppointmentByPatient = async (req, res) => {
    const bodyData = req.body;
    const appointments = await db.sequelize.query(`
        SELECT appointments.id AS id, 
            patient.firstName AS patientFirstName, patient.lastName AS patientLastName, patient.email AS patientEmail,
            nurse.firstName AS nurseFirstName, nurse.lastName AS nurseLastName, nurse.email AS nurseEmail
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id
        JOIN users AS patient ON appointments.userId=patient.id
        JOIN patients ON patients.user_id=patient.id
        JOIN packages ON appointments.packageId=packages.id
        JOIN users AS nurse ON calendars.nurse=nurse.id
        WHERE appointments.id=${bodyData.appointmentId}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const appointment = appointments.length > 0 ? appointments[0] : null;

    if (appointment) {
        const cancelTemplate = await Template.findOne({where: {assign: 'Appointment Cancel By Patient'}, raw: true});
        const content = cancelTemplate ? cancelTemplate.message : 'Appointment was canceled.';
        await Appointment.update({adminStatus: 'canceled'}, {where: {id: bodyData.appointmentId}});
        await MedicalQuestion.update({isActive: false}, {where: {appointmentId: bodyData.appointmentId}});
        await ContactHistory.create({appointmentId: bodyData.appointmentId, type: 'Termin abgesagt'});
        sendMail({email: appointment.patientEmail, subject: 'Appointment Cancel', content});
        sendMail({email: appointment.nurseEmail, subject: 'Appointment Cancel Requested', content: bodyData.content});
    } else {
        res.status(400).json({
            message: "Bad Request"
        })
    }
    // id, message
}

exports.shiftAppointmentByPatient = async (req, res) => {
    const data = req.body;
    const appointments = await db.sequelize.query(`
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
        WHERE appointments.id=${data.appointmentId}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const appointment = appointments.length > 0 ? appointments[0] : null;

    if (appointment) {
        const smsData = {
            subject: 'Patient Shift Appointment',
            receiver: appointment.nurseId,
            phoneNumber: appointment.nursePhoneNumber,
            content: 'Appointment was shifted.'
        };
        const emailData = {
            email: appointment.nurseEmail,
            subject: 'Patient Shift Appointment',
            content: 'Appointment was shifted'
        };
        sendMail(emailData);
        sendSMS(smsData);

        await Appointment.update({time: data.time}, {where: {id: data.appointmentId}});
        if (data.address) {
            await Patient.update(data.address, {where: {user_id: appointment.patientId}});
        }

        res.status(200).json({
            message: 'success'
        });
    }
}
