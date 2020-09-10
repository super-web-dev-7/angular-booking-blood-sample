import db from '../models';

const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const User = db.user;

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
    const allWorkingGroup = await WorkingGroup.findAll({where: {}, include: [Calendar]});
    const response = [];
    for (let workingGroup of allWorkingGroup) {
        const users = [];
        workingGroup.admin = JSON.parse(workingGroup.admin);
        for (const item of workingGroup.admin) {
            const user = await User.findByPk(item);
            users.push(user);
        }
        response.push({...workingGroup.dataValues, users})
    }
    res.status(200).json(response)
}

exports.delete = (req, res) => {
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