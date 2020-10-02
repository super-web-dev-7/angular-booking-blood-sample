import db from '../models';

const Calendar = db.calendar;
const District = db.district;
const Group = db.workingGroup;
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

exports.getById = async (req, res) => {
    User.hasMany(Calendar, {foreignKey: 'nurse'})
    Calendar.belongsTo(User, {foreignKey: 'nurse'});

    const calendar = await Calendar.findByPk(req.params.id, {include: [User], raw: true});

    const districts = [];
    calendar.district_id = JSON.parse(calendar.district_id);
    for (const id of calendar.district_id) {
        const district = await District.findByPk(id);
        districts.push(district);
    }
    const response = {...calendar, districts};
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

exports.delete = async (req, res) => {
    const allGroups = await Group.findAll({where: {calendar_id: req.params.id}});
    if (allGroups.length > 0) {
        res.status(400).json({message: 'This item can\'t delete.', status: 400});
        return;
    }

    Calendar.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}

exports.getUnusedCalendars = async (req, res) => {
    User.hasMany(Calendar, {foreignKey: 'nurse'})
    Calendar.belongsTo(User, {foreignKey: 'nurse'});

    const allCalendar = await Calendar.findAll({where: req.query, include: [User]});
    const groups = await Group.findAll({where: {}});

    const calendars = [];
    for (const calendar of allCalendar) {
        const tempGroup = groups.filter(item => item.calendar_id === calendar.id);
        if (tempGroup.length > 0) {
            continue;
        }
        calendars.push(calendar)
    }

    const response = [];
    for (let calendar of calendars) {
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