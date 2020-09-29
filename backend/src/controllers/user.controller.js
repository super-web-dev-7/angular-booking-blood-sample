import bcrypt from 'bcrypt';
import db from '../models';

const User = db.user;
const WorkingGroup = db.workingGroup;
const saltRounds = 10;
const Calendar = db.calendar;
const Agency = db.agency;
const Patient = db.patient;

exports.create = (req, res) => {
    const newUser = req.body;

    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        newUser.password = hash;
        User.create(newUser).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(400).send({
                message: err.errors[0].message || 'Some error occurred.'
            })
        })
    })
};

exports.createPatient = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        role: 'Patient',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        isActive: true
    }
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        newUser.password = hash;
        User.create(newUser).then(data => {
            const newPatientData = {
                user_id: data.id,
                salutation: req.body.salutation,
                street: req.body.street,
                age: req.body.age,
                gender: req.body.gender,
                plz: req.body.plz,
                ort: req.body.ort,
                differentPlace: req.body.differentPlace,
                customerStore: req.body.customerStore,
                alternative: req.body.alternative,
                sendSMS: req.body.sendSMS,
                otherStreet: req.body.otherStreet,
                otherCity: req.body.otherCity,
                otherPostalCode: req.body.otherPostalCode
            };
            Patient.create(newPatientData).then(patientData => {
                console.log(patientData);
            })
            res.send(data);
        }).catch(err => {
            res.status(400).send({
                message: err.errors[0].message || 'Some error occurred.'
            })
        })
    })
};

exports.get = async (req, res) => {
    const allUsers = await User.findAll({where: req.query});
    res.status(200).json(allUsers);
}

exports.getPatientById = async (req, res) => {
    const patient = await Patient.findAll({where: {user_id: req.params.id}});
    res.status(200).json(patient[0])
}

exports.getAgAdminInWorkingGroup = async (req, res) => {
    const admins = await User.findAll({where: {role: 'AG-Admin'}});
    const groups = await WorkingGroup.findAll({where: {}});
    const agAdmin = [];
    for (const group of groups) {
        group.admin = JSON.parse(group.admin);
    }
    for (const admin of admins) {
        let count = 0;
        for (const group of groups) {
            if (group.admin.includes(admin.id)) {
                break;
            } else {
                count++;
            }
        }

        if (count === groups.length) {
            agAdmin.push(admin);
            count = 0;
        }
    }
    res.status(200).json(agAdmin);
}

exports.delete = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user.role === 'Nurse') {
        const calendar = await Calendar.findAll({where: {nurse: req.params.id}});
        if (calendar.length > 0) {
            res.status(400).json({error: 'Calendar has this user'})
            return;
        }
    }
    if (user.role === 'AG-Admin') {
        const groups = await WorkingGroup.findAll({where: {}});
        for (const group of groups) {
            if (JSON.parse(group.admin).includes(parseInt(req.params.id))) {
                res.status(400).json({error: 'Working Group has this user.'});
                return;
            }
        }
    }
    if (user.role === 'Doctor') {
        const agency = await Agency.findAll({where: {}});
        for (const item of agency) {
            if (JSON.parse(item.doctors_id).includes(parseInt(req.params.id))) {
                res.status(400).json({error: 'Agency has this user'});
                return;
            }
        }
    }
    if (user.role === 'Patient') {
        Patient.destroy({where: {user_id: req.params.id}})
    }
    User.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    bcrypt.hash(data.password, saltRounds, function (err, hash) {
        data.password = hash;
        User.update(data, {returning: true, where: {id}}).then((rowsUpdated) => {
            res.json(rowsUpdated);
        });
    })
}

exports.updatePatientById = async (req, res) => {
    const body = req.body;
    console.log(body)
    const id = req.params.id;
    bcrypt.hash(body.password, saltRounds, function (err, hash) {
        body.password = hash;
        const data = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            phoneNumber: body.phoneNumber
        };
        console.log(id)
        console.log(data);
        User.update(data, {returning: true, where: {id}}).then((rowsUpdated) => {
            const patientData = {
                salutation: body.salutation,
                street: body.street,
                age: body.age,
                gender: body.gender,
                plz: body.plz,
                ort: body.ort,
                differentPlace: body.differentPlace,
                customerStore: body.customerStore,
                alternative: body.alternative,
                sendSMS: body.sendSMS,
                otherStreet: body.otherStreet,
                otherCity: body.otherCity,
                otherPostalCode: body.otherPostalCode
            };
            Patient.update(patientData, {returning: true, where: {user_id: id}}).then();
            res.json(data);
        });
    });
}
