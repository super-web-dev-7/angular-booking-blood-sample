import db from '../models';

const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const User = db.user;
const Package = db.package;
const Agency = db.agency;

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
    Agency.hasMany(WorkingGroup, {foreignKey: 'agency_id'});
    WorkingGroup.belongsTo(Agency, {foreignKey: 'agency_id'});
    const id = parseInt(req.query.admin);
    console.log(req.query);
    const allWorkingGroup = await WorkingGroup.findAll({where: {}, include: [Calendar, Agency]});
    const response = [];
    for (let workingGroup of allWorkingGroup) {
        const admins = [];
        workingGroup.admin = JSON.parse(workingGroup.admin);
        if (id && !workingGroup.admin.includes(id)) {
            continue;
        }
        for (const item of workingGroup.admin) {
            const user = await User.findByPk(item);
            admins.push(user);
        }
        response.push({...workingGroup.dataValues, admins})
    }
    res.status(200).json(response)
}

exports.delete = async (req, res) => {
    const allPackage = await Package.findAll({where: {group_id: req.params.id}});
    if (allPackage.length > 0) {
        res.status(400).json({message: 'This item can\'t delete.', status: 400});
        return;
    }
    const allAgency = await Agency.findAll({where: {group_id: req.params.id}});
    if (allAgency.length > 0) {
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
        User.hasMany(WorkingGroup, {foreignKey: 'admin'});
        WorkingGroup.belongsTo(Calendar, {foreignKey: 'calendar_id'});
        WorkingGroup.belongsTo(User, {foreignKey: 'admin'});

        WorkingGroup.findAll({where: {id}, include: [Calendar, User]}).then(workingGroup => {
            res.status(200).json(workingGroup);
        })
    });
}