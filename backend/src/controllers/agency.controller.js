import db from '../models';
import {response} from "express";

const Agency = db.agency;
const WorkingGroup = db.workingGroup;
const User = db.user;
const Appointment = db.appointment;

exports.create = (req, res) => {
    const newAgency = req.body;
    newAgency.doctors_id = JSON.stringify(newAgency.doctors_id);
    Agency.create(newAgency).then(data => {
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        });
    });
};

exports.get = async (req, res) => {
    WorkingGroup.hasMany(Agency, {foreignKey: 'group_id'});
    Agency.belongsTo(WorkingGroup, {foreignKey: 'group_id'});
    const allAgency = await Agency.findAll({where: {}, include: [WorkingGroup]});
    const response = [];
    for (const agency of allAgency) {
        let doctors;
        doctors = [];
        agency.doctors_id = JSON.parse(agency.doctors_id);
        for (const doctor_id of agency.doctors_id) {
            const doctor = await User.findByPk(doctor_id);
            doctors.push(doctor);
        }
        response.push({...agency.dataValues, doctors});
    }
    res.status(200).json(response);
}

exports.delete = async (req, res) => {
    const appointment = await Appointment.findAll({where: {agencyId: req.params.id}});
    if (appointment.length > 0) {
        res.status(400).json({error: 'Appointment has this agency'})
        return;
    }
    Agency.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    data.doctors_id = JSON.stringify(data.doctors_id);
    const id = req.params.id;
    Agency.update(data, {returning: true, where: {id}}).then(() => {
        WorkingGroup.hasMany(Agency, {foreignKey: 'group_id'});
        Agency.belongsTo(WorkingGroup, {foreignKey: 'group_id'});
        Agency.findByPk(id, {include: [WorkingGroup]}).then(async updatedAgency => {
            let doctors;
            doctors = [];
            updatedAgency.doctors_id = JSON.parse(updatedAgency.doctors_id);
            for (const doctor_id of updatedAgency.doctors_id) {
                const doctor = await User.findByPk(doctor_id);
                doctors.push(doctor);
            }
            res.status(200).json({...updatedAgency.dataValues, doctors});
        })
    })
}
