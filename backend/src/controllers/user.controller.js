import bcrypt from 'bcrypt';
import db from '../models';

const User = db.user;
const WorkingGroup = db.workingGroup;
const saltRounds = 10;
const Calendar = db.calendar;
const Agency = db.agency;

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

exports.get = async (req, res) => {
    WorkingGroup.hasMany(User, {foreignKey: 'allocation'});
    User.belongsTo(WorkingGroup, {foreignKey: 'allocation'});
    const allUsers = await User.findAll({where: req.query, include: [WorkingGroup]});
    res.status(200).json(allUsers);
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
                res.status(400).json({error: 'Working Group has this user'});
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
    User.destroy({where: {id: req.params.id}}).then(result => {
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