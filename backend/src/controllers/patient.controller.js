import db from '../models';

const MedicalQuestion = db.medicalQuestion;
const Appointment = db.appointment;

exports.createMedicalQuestion = async (req, res) => {
    await Appointment.update({anamnesisStatus: 'open'}, {where: {id: req.body.appointmentId}});
    const newMedicalQuestion = await MedicalQuestion.create(req.body);
    res.status(201).json(newMedicalQuestion);
}