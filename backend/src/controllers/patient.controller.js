import db from '../models';

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;
const ContactHistory = db.contactHistory;

exports.createMedicalQuestion = async (req, res) => {
    await Appointment.update({anamnesisStatus: 'open'}, {where: {id: req.body.appointmentId}});
    const newMedicalQuestion = await MedicalQuestion.create(req.body);
    await ContactHistory.create({appointmentId: req.body.appointmentId, type: 'Arztrückruf angefragt'});
    res.status(201).json(newMedicalQuestion);
}
