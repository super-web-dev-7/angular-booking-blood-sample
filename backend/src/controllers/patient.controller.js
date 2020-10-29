import db from '../models';
import {sendMail} from "../helper/email";

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;
const ContactHistory = db.contactHistory;
const CallbackDoctor = db.callbackDoctor;
const Template = db.template;

exports.createMedicalQuestion = async (req, res) => {
    await Appointment.update({anamnesisStatus: 'open'}, {where: {id: req.body.appointmentId}});
    const newMedicalQuestion = await MedicalQuestion.create(req.body);
    await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'Arztrückruf angefragt'});
    res.status(201).json(newMedicalQuestion);
}

exports.createCallback = async (req, res) => {
    const newCallbackData = req.body;
    await Appointment.update({callbackStatus: true}, {where: {id: newCallbackData.appointmentId}});
    await ContactHistory.create({appointmentId: newCallbackData.appointmentId, type: 'Rückruf erstellt'});
    const newCallback = await CallbackDoctor.create(newCallbackData);
    res.status(201).json(newCallback);
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
