import db from '../models';
import {sendMail} from '../helper/email';

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;
const ContactHistory = db.contactHistory;
// const MedicalAnswer = db.medicalAnswer;
const CallbackDoctor = db.callbackDoctor;
const PatientRecall = db.patientRecall;
const EditingStatus = db.editingStatus;
const sequelize = db.sequelize;

exports.sendMessageToPatient = async (req, res) => {
    // const newAnswerData = {
    //     questionId: req.body.questionId,
    //     answer: req.body.answer
    // };
    // const newAnswer = await MedicalAnswer.create(newAnswerData);
    // if (newAnswer) {
    // await Appointment.update({anamnesisStatus: 'closed'}, {where: {id: req.body.appointmentId}});
    // await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'Doctor answered'});
    const user = await sequelize.query(`
        SELECT users.email AS email
        FROM medical_questions 
        JOIN appointments ON appointments.id=medical_questions.appointmentId
        JOIN users ON appointments.userId=users.id
        WHERE medical_questions.id=${req.body.questionId}
        `, {type: db.Sequelize.QueryTypes.SELECT});
    if (user[0]) {
        const mailData = {
            email: user[0].email,
            subject: 'Doctor Answer',
            from: process.env.OWNER_EMAIL,
            content: req.body.answer
        }
        await sendMail(mailData);
    }
    // }
    res.status(201).json({message: 'Email sent'});
}

exports.getContactHistory = async (req, res) => {
    const id = req.params.id;
    const appointment = await sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS startTime,
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
        WHERE appointments.id=${id}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const contactHistory = await ContactHistory.findAll({where: {appointmentId: id}, raw: true, nest: true});
    for (const item of contactHistory) {
        if (item.type === 'callback_created') {
            item.callback = await CallbackDoctor.findByPk(item.otherId, {raw: true});
        }

        if (item.type === 'callback_answer') {
            item.callback_answer = await db.callbackAnswer.findByPk(item.otherId, {raw: true});
        }
    }
    const response = {
        appointment,
        contactHistory
    };
    res.status(200).json(response);
}

exports.cancelAppointment = async (req, res) => {
    const id = req.params.id;
    await Appointment.update({adminStatus: 'canceled'}, {where: {id}});
    await MedicalQuestion.update({isActive: false}, {where: {appointmentId: id}});
    await ContactHistory.create({appointmentId: id, type: 'appointment_cancel'});

    const user = await sequelize.query(`
        SELECT users.email AS email, appointments.id AS appointmentId 
        FROM appointments
        JOIN users ON appointments.userId=users.id
        WHERE appointments.id=${id}
    `, {type: db.Sequelize.QueryTypes.SELECT});

    if (user.length > 0) {
        const mailData = {
            email: user[0].email,
            subject: 'Appointment cancel',
            from: process.env.OWNER_EMAIL,
            content: 'Your questionnaire is not good.'
        };
        await sendMail(mailData);
    }
    res.status(200).json({message: 'Appointment cancel'});
}

exports.releaseAppointment = async (req, res) => {
    const id = req.params.id;
    await Appointment.update({adminStatus: 'confirmed', nurseStatus: 'standard'}, {where: {id}});
    await MedicalQuestion.update({isActive: false}, {where: {appointmentId: id}});
    await ContactHistory.create({appointmentId: id, type: 'appointment_confirmed'});
    const user = await sequelize.query(`
        SELECT users.email AS email, appointments.id AS appointmentId
        FROM appointments
        JOIN users ON appointments.userId=users.id
        WHERE appointments.id=${id}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    if (user.length > 0) {
        const mailData = {
            email: user[0].email,
            subject: 'Appointment confirm',
            from: process.env.OWNER_EMAIL,
            content: 'Your appointment was confirmed.'
        };
        sendMail(mailData);
    }

    // Send API to Laboratory

    res.status(200).json({message: 'Appointment confirmed'})
}

exports.sendMessageToPatientAboutCallback = async (req, res) => {
    const callbackAnswer = await db.callbackAnswer.findOne({where: {callbackId: req.body.callbackId}});
    console.log(callbackAnswer)
    if (!callbackAnswer) {
        const newCallbackAnswer = await db.callbackAnswer.create(req.body);
        const callback = await CallbackDoctor.findOne({where: {id: req.body.callbackId}});
        await ContactHistory.create({appointmentId: callback.appointmentId, type: 'callback_answer', otherId: newCallbackAnswer.id});
        const user = await sequelize.query(`
        SELECT users.email AS email
        FROM callback_doctors 
        JOIN appointments ON appointments.id=callback_doctors.appointmentId
        JOIN users ON appointments.userId=users.id
        WHERE callback_doctors.id=${req.body.callbackId}
        `, {type: db.Sequelize.QueryTypes.SELECT});
        if (user[0]) {
            const mailData = {
                email: user[0].email,
                subject: 'Doctor Answer',
                from: process.env.OWNER_EMAIL,
                content: req.body.answer
            }
            sendMail(mailData);
        }
        res.status(201).json({message: 'Email sent', answer: newCallbackAnswer});
    } else {
        res.status(400).json({message: 'Already answered'});
    }

}

exports.inquiryAnswered = async (req, res) => {
    const id = req.params.id;
    await Appointment.update({callbackStatus: false}, {where: {id}});
    // await ContactHistory.create({appointmentId: id, type: 'Rückruf beantwortet'});
    await CallbackDoctor.update({isActive: false}, {where: {appointmentId: id}});
    const user = await sequelize.query(`
        SELECT users.email AS email, appointments.id AS appointmentId
        FROM appointments
        JOIN users ON appointments.userId=users.id
        WHERE appointments.id=${id}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    if (user.length > 0) {
        const mailData = {
            email: user[0].email,
            subject: 'Appointment confirm',
            from: process.env.OWNER_EMAIL,
            content: 'Your appointment callback was answered.'
        };
        await sendMail(mailData);
    }

    // Send API to Laboratory

    res.status(200).json({message: 'Appointment callback answered'})
}

exports.createPatientRecall = async (req, res) => {
    const newRecall = await PatientRecall.create(req.body);
    await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'recall_created'});
    res.status(201).json(newRecall);
}

exports.setAppointmentToArchive = async (req, res) => {
    const id = req.params.appointmentId;
    await Appointment.update({archive: true}, {where: {id}});
    await ContactHistory.create({appointmentId: id, type: 'appointment_archived'});
    res.status(200).json({message: 'archived'});
}

exports.getEditingStatus = async (req, res) => {
    const allStatus = await EditingStatus.findAll();
    res.status(200).json(allStatus);
}