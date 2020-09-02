import db from '../models';
import bcrypt from "bcrypt";

const Calendar = db.calendar;
const District = db.district;
const User = db.user;

exports.create = (req, res) => {
    const newCalendar = req.body;
    Calendar.create(newCalendar).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.errors[0].message || 'Some error occurred.'
        })
    })
};

exports.get = async (req, res) => {
    District.hasMany(Calendar, {foreignKey: 'district_id'});
    User.hasMany(Calendar, {foreignKey: 'nurse'})
    Calendar.belongsTo(District, {foreignKey: 'district_id'});
    Calendar.belongsTo(User, {foreignKey: 'nurse'});

    const allCalendar = await Calendar.findAll({where: req.query, include: [District, User]})
    res.status(200).json(allCalendar);
}

exports.update = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Calendar.update(data, {returning: true, where: {id}}).then((rowUpdated) => {
        District.hasMany(Calendar, {foreignKey: 'district_id'});
        User.hasMany(Calendar, {foreignKey: 'nurse'})
        Calendar.belongsTo(District, {foreignKey: 'district_id'});
        Calendar.belongsTo(User, {foreignKey: 'nurse'});

        Calendar.findAll({where: {id}, include: [District, User]}).then(allCalendar => {
            res.status(200).json(allCalendar);
        })
    });
}

exports.delete = (req, res) => {
    Calendar.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}
