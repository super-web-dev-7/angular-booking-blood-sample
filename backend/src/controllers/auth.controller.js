import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import config from '../config/config';
import {sendSMS} from '../helper/sms';

const User = db.user;
const VerificationCode = db.verificationCode;

const saltRounds = 10;
const sessionTimeByRole = {
    'Superadmin': 480,
    'AG-Admin': 480,
    'Nurse': 480,
    'Doctor': 30,
    'Patient': 30
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

exports.register = (req, res) => {
    const newUser = req.body;
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        newUser.password = hash;
        newUser.role = 'patient'
        User.create(newUser).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.errors[0].message || "Some error occurred while registering"
            });
        });
    })
};

exports.login = async (req, res) => {
    const auth_data = req.body;
    const user = await User.findOne({where: {email: auth_data.email.toLowerCase()}});
    if (user) {
        if (!user.isActive) {
            res.status(400).send({
                message: 'User is not active.'
            });
            return;
        }
        const passwordIsValid = bcrypt.compareSync(auth_data.password, user.password);
        if (passwordIsValid) {
            // Passwords match
            if (user.role === 'Patient') {
                const code = generateDigitalCode(6);
                console.log(code);
                const smsData = {
                    subject: 'Patient Verification Code',
                    receiver: user.id,
                    phoneNumber: user.phoneNumber,
                    content: code
                }
                sendSMS(smsData);
                VerificationCode.create({email: user.email.toLowerCase(), code});
                res.json({role: 'Patient', sms: 'sms sent'});
            } else if (user.role === 'AG-Admin') {
                const workingGroup = await getWorkingGroupFromAdmin(user.id);
                if (workingGroup) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }, config.jwtSecret, {
                        // expiresIn: 35
                        expiresIn: sessionTimeByRole[user.role] * 60
                    });
                    res.json({token});
                } else {
                    res.status(400).send({
                        message: 'This User is not approved.'
                    })
                }
            } else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName
                }, config.jwtSecret, {
                    // expiresIn: 35
                    expiresIn: sessionTimeByRole[user.role] * 60
                });
                res.json({token});
            }
        } else {
            // Passwords don't match
            res.status(400).send({
                message: 'Incorrect Username Or Password!'
            });
        }
    } else {
        res.status(400).send({
            message: 'Incorrect Username Or password!'
        });
    }
}

exports.verifyCode = async (req, res) => {
    const data = req.body.data;
    const verificationCode = await VerificationCode.findOne({
        where: {
            email: data.email.toLowerCase(),
            code: data.code,
            isActive: true
        }
    });
    if (verificationCode) {
        const user = await User.findOne({where: {email: data.email.toLowerCase()}});
        if (user) {
            if (!user.isActive) {
                res.status(400).send({
                    message: 'User is not active.'
                });
                return;
            }
            const passwordIsValid = bcrypt.compareSync(data.password, user.password);
            if (passwordIsValid) {
                // Passwords match
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName
                }, config.jwtSecret, {
                    // expiresIn: 35
                    expiresIn: sessionTimeByRole[user.role] * 60
                });
                res.json({token});
                VerificationCode.destroy({where: {email: data.email.toLowerCase()}});
            } else {
                // Passwords don't match
                res.status(400).send({
                    message: 'Incorrect Username Or Password!'
                });
            }
        } else {
            res.status(400).send({
                message: 'Incorrect Email Or Password'
            });
        }
    } else {
        res.status(400).send({
            message: 'Incorrect Code'
        });
    }
}

exports.resetToken = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({where: {email}});
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
    }, config.jwtSecret, {
        // expiresIn: 35
        expiresIn: sessionTimeByRole[user.role] * 60
    });
    res.json({token});
}

exports.forgotPassword = async (req, res) => {
    const resetPassword = generateKey(6);
    const hash = bcrypt.hashSync(resetPassword, saltRounds);
    const updated = await User.update({password: hash}, {where: {email: req.body.email}});
}

function generateKey(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateDigitalCode(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}