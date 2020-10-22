import db from '../models';

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;
const ContactHistory = db.contactHistory;
const CallbackDoctor = db.callbackDoctor;

exports.createMedicalQuestion = async (req, res) => {
    await Appointment.update({anamnesisStatus: 'open'}, {where: {id: req.body.appointmentId}});
    const newMedicalQuestion = await MedicalQuestion.create(req.body);
    await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'Arztrückruf angefragt'});
    res.status(201).json(newMedicalQuestion);
}

exports.createCallback = async (req, res) => {
    const newCallbackData = req.body;
    await Appointment.update({callbackStatus: true}, {where: {id: newCallbackData.appointmentId}});
    await ContactHistory.create({appointmentId: newCallbackData.appointmentId, type: 'Callback created'});
    const newCallback = await CallbackDoctor.create(newCallbackData);
    res.status(201).json(newCallback);
}
