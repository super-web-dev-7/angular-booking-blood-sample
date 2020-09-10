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
    User.hasMany(Calendar, {foreignKey: 'nurse'})
    Calendar.belongsTo(User, {foreignKey: 'nurse'});

    const allCalendar = await Calendar.findAll({where: req.query, include: [User]})
    const response = [];
    for (let calendar of allCalendar) {
        const districts = [];
        calendar.district_id = JSON.parse(calendar.district_id);
        for (const id of calendar.district_id) {
            const district = await District.findByPk(id);
            districts.push(district);
        }
        response.push({...calendar.dataValues, districts});
    }
    res.status(200).json(response);
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Calendar.update(data, {returning: true, where: {id}}).then((rowUpdated) => {
        User.hasMany(Calendar, {foreignKey: 'nurse'})
        Calendar.belongsTo(User, {foreignKey: 'nurse'});

        Calendar.findAll({where: {id}, include: [User]}).then(async (allCalendar) => {
            const response = [];
            for (let calendar of allCalendar) {
                const districts = [];
                calendar.district_id = JSON.parse(calendar.district_id);
                for (const id of calendar.district_id) {
                    const district = await District.findByPk(id);
                    districts.push(district);
                }
                response.push({...calendar.dataValues, districts});
            }
            res.status(200).json(response);
        })
    });
}

exports.delete = (req, res) => {
    Calendar.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}
