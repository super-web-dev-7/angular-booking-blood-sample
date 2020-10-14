import db from '../models';
import Sequelize from "sequelize";

const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const User = db.user;
const Package = db.package;
const Agency = db.agency;
const WorkingGroupAgency = db.workingGroupAgency;

exports.create = (req, res) => {
    const newGroup = req.body;
    WorkingGroup.create(newGroup).then(async (data) => {
        for (const agencyId of newGroup.agencyIds) {
            await WorkingGroupAgency.create(
                {
                    groupId: data.id,
                    agencyId: agencyId
                }
            );
        }
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
    Agency.hasMany(WorkingGroupAgency, {foreignKey: 'agencyId'});
    WorkingGroupAgency.belongsTo(Agency, {foreignKey: 'agencyId'});
    const id = parseInt(req.query.admin);
    const allWorkingGroup = await WorkingGroup.findAll({where: {}, include: [Calendar], raw: true, nest: true});
    const response = [];
    for (let workingGroup of allWorkingGroup) {
        const admins = [];
        workingGroup.admin = JSON.parse(workingGroup.admin);
        if (id && !workingGroup.admin.includes(id)) {
            continue;
        }
        const workingGroupAgency = await WorkingGroupAgency.findAll({where: {groupId: workingGroup.id}, include: [Agency], raw: true, nest: true})

        for (const item of workingGroup.admin) {
            const user = await User.findByPk(item);
            admins.push(user);
        }
        response.push({...workingGroup, admins, agency: workingGroupAgency});
    }
    res.status(200).json(response)
}

exports.delete = async (req, res) => {
    const allPackage = await Package.findAll({where: {group_id: req.params.id}});
    if (allPackage.length > 0) {
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
    WorkingGroup.update(data, {returning: true, where: {id}}).then(async () => {
        if (data.agencyIds) {
            await WorkingGroupAgency.destroy({where: {groupId: id}});
            for (const agencyId of data.agencyIds) {
                await WorkingGroupAgency.create(
                    {
                        groupId: id,
                        agencyId: agencyId
                    }
                );
            }
        }
        Calendar.hasMany(WorkingGroup, {foreignKey: 'calendar_id'});
        WorkingGroup.belongsTo(Calendar, {foreignKey: 'calendar_id'});
        Agency.hasMany(WorkingGroupAgency, {foreignKey: 'agencyId'});
        WorkingGroupAgency.belongsTo(Agency, {foreignKey: 'agencyId'});
        WorkingGroup.findOne({where: {id}, include: [Calendar]}).then(async (workingGroup) => {
            const admins = [];
            workingGroup.admin = JSON.parse(workingGroup.admin);
            for (const item of workingGroup.admin) {
                const user = await User.findByPk(item);
                admins.push(user);
            }
            const workingGroupAgency = await WorkingGroupAgency.findAll({where: {groupId: workingGroup.id}, include: [Agency], raw: true, nest: true})
            res.status(200).json({...workingGroup.dataValues, admins, agency: workingGroupAgency});
        });
    });
}
//
// exports.getUnusedGroup = async (req, res) => {
//     const allGroups = await db.sequelize.query(`SELECT * FROM working_groups WHERE id NOT IN (SELECT groupId FROM agency_groups)`, {type: Sequelize.QueryTypes.SELECT});
//     res.status(200).json(allGroups);
// }