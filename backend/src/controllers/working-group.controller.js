import db from '../models';
import Sequelize from "sequelize";

const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const User = db.user;
const Package = db.package;
const Agency = db.agency;
const AgencyGroup = db.agencyGroup;

exports.create = (req, res) => {
    const newGroup = req.body;
    WorkingGroup.create(newGroup).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(400).send({
            message: err.errors[0].message || 'Some error occurred.'
        })
    })
};

exports.get = async (req, res) => {
    Calendar.hasMany(WorkingGroup, {foreignKey: 'calendar_id'});
    WorkingGroup.belongsTo(Calendar, {foreignKey: 'calendar_id'});
    const id = parseInt(req.query.admin);
    const allWorkingGroup = await WorkingGroup.findAll({where: {}, include: [Calendar], raw: true, nest: true});
    const response = [];
    for (let workingGroup of allWorkingGroup) {
        const admins = [];
        workingGroup.admin = JSON.parse(workingGroup.admin);
        if (id && !workingGroup.admin.includes(id)) {
            continue;
        }
        const agencyGroup = await AgencyGroup.findOne({where: {groupId: workingGroup.id}, raw: true});
        let agency;
        if (agencyGroup) {
            agency = await Agency.findByPk(agencyGroup.agencyId, {raw: true});
        }

        for (const item of workingGroup.admin) {
            const user = await User.findByPk(item);
            admins.push(user);
        }
        response.push({...workingGroup, admins, agency: agency});
    }
    res.status(200).json(response)
}

exports.delete = async (req, res) => {
    const allPackage = await Package.findAll({where: {group_id: req.params.id}});
    if (allPackage.length > 0) {
        res.status(400).json({message: 'This item can\'t delete.', status: 400});
        return;
    }
    const allAgencyGroup = await AgencyGroup.findAll({where: {groupId: req.params.id}});
    if (allAgencyGroup.length > 0) {
        res.status(400).json({message: 'This item can\'t delete.', status: 400});
        return;
    }
    WorkingGroup.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    });
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    WorkingGroup.update(data, {returning: true, where: {id}}).then((rowUpdated) => {
        Calendar.hasMany(WorkingGroup, {foreignKey: 'calendar_id'});
        // User.hasMany(WorkingGroup, {foreignKey: 'admin'});
        WorkingGroup.belongsTo(Calendar, {foreignKey: 'calendar_id'});
        // WorkingGroup.belongsTo(User, {foreignKey: 'admin'});

        WorkingGroup.findOne({where: {id}, include: [Calendar]}).then(async (workingGroup) => {
            const admins = [];

            workingGroup.admin = JSON.parse(workingGroup.admin);
            for (const item of workingGroup.admin) {
                const user = await User.findByPk(item);
                admins.push(user);
            }
            res.status(200).json({...workingGroup.dataValues, admins});
        })
    });
}

exports.getUnusedGroup = async (req, res) => {
    const allGroups = await db.sequelize.query(`SELECT * FROM working_groups WHERE id NOT IN (SELECT groupId FROM agency_groups)`, {type: Sequelize.QueryTypes.SELECT});
    res.status(200).json(allGroups);
}