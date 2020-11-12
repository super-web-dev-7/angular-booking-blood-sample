import bcrypt from 'bcrypt';
import db from '../models';
import Sequelize from 'sequelize';
import {sendSMS} from '../helper/sms';
import jwt from 'jsonwebtoken/index';
import config from '../config/config';

const User = db.user;
const WorkingGroup = db.workingGroup;
const saltRounds = 10;
const Calendar = db.calendar;
const Agency = db.agency;
const Patient = db.patient;
const Appointment = db.appointment;
const VerificationCode = db.verificationCode;
const sequelize = db.sequelize;
// const Op = db.sequelize;

const sessionTimeByRole = {
    'Superadmin': 480,
    'AG-Admin': 480,
    'Nurse': 480,
    'Doctor': 30,
    'Patient': 30
}

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
    };
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
        newUser.password = hash;
        User.create(newUser).then( async data => {
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
                otherStreet: req.body.otherStreet,
                otherCity: req.body.otherCity,
                otherPostalCode: req.body.otherPostalCode
            };
            const patient = await Patient.create(newPatientData)
            res.send({user: data, patient: patient});
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: 'Some error occurred.'
            })
        })
    });
};

exports.get = async (req, res) => {
    const allUsers = await User.findAll({where: req.query});
    res.status(200).json(allUsers);
}

exports.getPatients = async (req, res) => {
    const allPatients = await User.findAll({where: {role: 'Patient', isActive: true}});
    res.status(200).json(allPatients);
}

exports.getPatientById = async (req, res) => {
    const patient = await Patient.findAll({where: {user_id: req.params.patientId}});
    res.status(200).json(patient[0])
}

exports.getPatientsByAdmin = async (req, res) => {
    const allPatients = await sequelize.query(`
        SELECT * FROM users 
        JOIN patients ON patients.user_id=users.id
    `, {type: Sequelize.QueryTypes.SELECT});
    const adminId = parseInt(req.params.adminId);
    const availableZipCode = [];
    const workingGroups = await db.workingGroup.findAll({raw: true});
    let value;
    for (const workingGroup of workingGroups) {
        const admins = JSON.parse(workingGroup.admin);
        if (admins.includes(adminId)) {
            value = workingGroup;
            break;
        }
    }
    if (value) {
        const calendar = await Calendar.findOne({where: {id: value.calendar_id}, raw: true});
        const districtIds = JSON.parse(calendar.district_id);
        for (const districtId of districtIds) {
            const district = await db.district.findOne({where: {id: districtId}, raw: true});
            const districtModels = await db.districtModel.findAll({where: {city: district.city, district: district.district}, raw: true});
            for (const districtModel of districtModels) {
                availableZipCode.push(districtModel);
            }
        }
    }
    let response = [];
    for (const patient of allPatients) {
        const zipCode = patient.differentPlace ? patient.otherPostalCode : patient.plz;
        const index = availableZipCode.findIndex(item => item.zipcode === zipCode);
        if (index > -1) {
            response.push(patient);
        }
    }
    res.status(200).json(response);
}

exports.getUserInfo = async (req, res) => {
    const user = await User.findOne({where: {id: req.params.id}, raw: true});
    if (user && user.role === 'Patient') {
        const patient = await Patient.findOne({where: {user_id: req.params.id}, raw: true});
        res.status(200).json({...patient, ...user, patientId: patient.id});
    } else {
        res.status(200).json(user);
    }
}

exports.getAgAdminInWorkingGroup = async (req, res) => {
    const admins = await User.findAll({where: {role: 'AG-Admin', isActive: true}});
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

exports.unassignedInCalendar = async (req, res) => {
    const allNurses = await sequelize.query(`SELECT * FROM users WHERE role="Nurse" AND isActive=true AND id NOT IN (SELECT nurse FROM calendars)`, {type: Sequelize.QueryTypes.SELECT})
    res.status(200).json(allNurses);
}

exports.unassignedInAgency = async (req, res) => {
    const allDoctors = await User.findAll({where: {...req.query, isActive: true}});
    const unassignedDoctors = [];
    for (const doctor of allDoctors) {
        let include = false;
        const allAgency = await Agency.findAll();
        for (const agency of allAgency) {
            const doctorIds = JSON.parse(agency.doctors_id);
            if (doctorIds.includes(doctor.id)) {
                include = true;
                break;
            }
        }
        if (!include) {
            unassignedDoctors.push(doctor);
        }
    }
    res.status(200).json(unassignedDoctors);
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
        const appointment = await Appointment.findAll({where: {userId: req.params.id}});
        if (appointment.length > 0) {
            res.status(400).json({error: 'Appointment has this user'})
            return;
        } else {
            Patient.destroy({where: {user_id: req.params.id}})
        }
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
        }).catch(err => {
            res.status(400).send({
                message: err.errors[0].message || 'Some error occurred.'
            })
        });
    })
}

exports.updateProfile = async (req, res) => {
    const id = req.params.id;
    const userData = req.body.user;
    const user = await User.findByPk(id, {raw: true});
    if (user.phoneNumber === req.body.user.phoneNumber) {
        bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
            userData.password = hash;
            await User.update(userData, {where: {id}});
            const updatedUser = await User.findByPk(id);
            const token = jwt.sign({
                id: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName
            }, config.jwtSecret, {
                // expiresIn: 35
                expiresIn: sessionTimeByRole[user.role] * 60
            });
            if (user.role === 'Patient' && req.body.patient) {
                await Patient.update(req.body.patient, {where: {user_id: id}});
            }
            res.status(200).json({token});
        });
    } else {
        const code = generateDigitalCode(6);
        console.log(code);
        const smsData = {
            subject: 'Verification Code',
            receiver: id,
            phoneNumber: userData.phoneNumber,
            content: code
        };
        sendSMS(smsData);
        VerificationCode.create({email: user.email.toLowerCase(), code});
        res.status(200).json({
            message: 'sent code',
            token: null
        });
    }
}

exports.verifyCode = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const userData = data.user;
    const patientData = data.patient;
    const verificationCode = await VerificationCode.findOne({
        where: {
            email: data.user.email.toLowerCase(),
            code: data.code,
            isActive: true
        }
    });

    if (verificationCode) {
        bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
            userData.password = hash;
            await User.update(req.body.user, {where: {id}});
            await User.update(req.body.user, {where: {id}});
            const updatedUser = await User.findByPk(id);
            const token = jwt.sign({
                id: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName
            }, config.jwtSecret, {
                // expiresIn: 35
                expiresIn: sessionTimeByRole[updatedUser.role] * 60
            });
            if (updatedUser.role === 'Patient' && data.patient) {
                await Patient.update(data.patient, {where: {user_id: id}});
            }
            res.status(200).json({token});
        })

        VerificationCode.destroy({where: {email: data.user.email.toLowerCase()}});

    } else {
        res.status(400).json({
            message: 'Incorrect code!'
        })
    }
}

const generateDigitalCode = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.updatePatientById = async (req, res) => {
    const body = req.body;
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
        User.update(data, {returning: true, where: {id}}).then(() => {
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
                otherStreet: body.otherStreet,
                otherCity: body.otherCity,
                otherPostalCode: body.otherPostalCode
            };
            Patient.update(patientData, {returning: true, where: {user_id: id}}).then();
            res.json(data);
        }).catch(err => {
            res.status(400).send({
                message: err.errors[0].message || 'Some error occurred.'
            });
        });
    });
}
