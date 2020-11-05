import db from '../models';

const Calendar = db.calendar;
const District = db.district;
const Group = db.workingGroup;
const User = db.user;
const Appointment = db.appointment;

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
    Calendar.update(data, {returning: true, where: {id}}).then(() => {
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

    Calendar.destroy({where: {id: req.params.id}}).then(() => {
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

exports.getBookingTimeByAgency = async (req, res) => {
    const agencyId = req.params.agencyId;
    const calendars = await db.sequelize.query(`
        SELECT c.*
        FROM calendars c
        JOIN working_groups ON working_groups.calendar_id=c.id
        JOIN working_group_agencies ON working_group_agencies.groupId=working_groups.id
        WHERE working_group_agencies.agencyId=${agencyId}
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const calendar = calendars.length > 0 ? calendars[0] : null;
    if (!calendar) {
        res.status(200).json([]);
        return;
    }
    const appointments = await Appointment.findAll({where: {agencyId}, raw: true});
    const date = new Date();
    const millisecondOfDay = 86400 * 1000;
    let currentDay = date.getDay();
    // let currentDay = 3;
    currentDay = (currentDay + 2) % 7;
    const response = [];
    let plusDate = 0;
    const durationAppointment = calendar.duration_appointment * 60 * 1000;
    const restTime = calendar.rest_time * 60 * 1000;
    let workingTimeFrom = getMillisecondsFromNumber(calendar.working_time_from) + millisecondOfDay * 2;
    let workingTimeUntil = getMillisecondsFromNumber(calendar.working_time_until) + millisecondOfDay * 2;
    while (true) {
        if (currentDay === 0 || currentDay === 6) {
            currentDay = (currentDay + 1) % 7;
        } else {

            let time = workingTimeFrom;
            while ((time + durationAppointment) < workingTimeUntil) {
                if (time > date.getTime() + millisecondOfDay * 2) {
                    if (appointments.findIndex(item => item.time === time) === -1) {
                        response.push(time);
                    }
                }
                time += durationAppointment + restTime;
            }
            plusDate++;
            currentDay = (currentDay + 1) % 7;
            if (plusDate === 5) {
                break;
            }
        }
        workingTimeFrom += millisecondOfDay;
        workingTimeUntil += millisecondOfDay;
    }
    res.status(200).json(response);
}

exports.getBookingTimeByZipcode = async (req, res) => {
    // const packageId = req.params.packageId;
    const zipcode = req.params.zipcode;
    const districtModel = await db.districtModel.findOne({where: {zipcode}, raw: true});
    if (!districtModel) {
        res.status(400).json([]);
        return;
    }
    const district = await District.findOne({where: {city: 'Berlin', district: districtModel.district}});
    if (!district) {
        res.status(400).json([]);
        return;
    }
    let calendar = null;
    const calendars = await Calendar.findAll({raw: true});
    for (const item of calendars) {
        const districtIds = JSON.parse(item.district_id);
        if (districtIds.includes(district.id)) {
            calendar = item;
            break;
        }
    }
    if (!calendar) {
        res.status(200).json([]);
        return;
    }
    const appointments = await db.sequelize.query(`
        SELECT appointments.id AS id, appointments.time AS time
        FROM appointments
        JOIN agencies ON appointments.agencyId=agencies.id
        JOIN working_group_agencies ON working_group_agencies.agencyId=agencies.id
        JOIN working_groups ON working_group_agencies.groupId=working_groups.id
        JOIN calendars ON working_groups.calendar_id=calendars.id       
        WHERE calendars.id=${calendar.id}        
    `, {type: db.Sequelize.QueryTypes.SELECT});
    const date = new Date();
    const millisecondOfDay = 86400 * 1000;
    let currentDay = date.getDay();
    currentDay = (currentDay + 2) % 7;
    const response = [];
    let plusDate = 0;
    const durationAppointment = calendar.duration_appointment * 60 * 1000;
    const restTime = calendar.rest_time * 60 * 1000;
    let workingTimeFrom = getMillisecondsFromNumber(calendar.working_time_from) + millisecondOfDay * 2;
    let workingTimeUntil = getMillisecondsFromNumber(calendar.working_time_until) + millisecondOfDay * 2;
    while (true) {
        if (currentDay === 0 || currentDay === 6) {
            currentDay = (currentDay + 1) % 7;
        } else {

            let time = workingTimeFrom;
            while ((time + durationAppointment) < workingTimeUntil) {
                if (time > (date.getTime() + millisecondOfDay * 2)) {
                    if (appointments.findIndex(item => item.time === time) === -1) {
                        response.push(time);
                    }
                }
                time += durationAppointment + restTime;
            }
            plusDate++;
            currentDay = (currentDay + 1) % 7;
            if (plusDate === 5) {
                break;
            }
        }
        workingTimeFrom += millisecondOfDay;
        workingTimeUntil += millisecondOfDay;
    }
    res.status(200).json(response);
}

const getMillisecondsFromNumber = (num) => {
    const now = new Date();
    const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Math.floor(num / 2),
        num % 2 === 0 ? 0 : 30
    );
    return date.getTime();
}
