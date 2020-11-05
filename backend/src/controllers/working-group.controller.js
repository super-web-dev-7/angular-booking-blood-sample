import db from '../models';

const WorkingGroup = db.workingGroup;
const Calendar = db.calendar;
const User = db.user;
const Package = db.package;
const PackageGroup = db.packageGroup;
const Agency = db.agency;
const WorkingGroupAgency = db.workingGroupAgency;

Calendar.hasMany(WorkingGroup, {foreignKey: 'calendar_id'});
WorkingGroup.belongsTo(Calendar, {foreignKey: 'calendar_id'});
Agency.hasMany(WorkingGroupAgency, {foreignKey: 'agencyId'});
WorkingGroupAgency.belongsTo(Agency, {foreignKey: 'agencyId'});
Package.hasMany(PackageGroup, {foreignKey: 'packageId'});
PackageGroup.belongsTo(Package, {foreignKey: 'packageId'});

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
        for (const packageId of newGroup.packageIds) {
            await PackageGroup.create({
                groupId: data.id,
                packageId: packageId
            });
        }
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.errors[0].message || 'Some error occurred.'
        });
    });
};

exports.get = async (req, res) => {
    const id = parseInt(req.query.admin);
    const allWorkingGroup = await WorkingGroup.findAll({where: {}, include: [Calendar], raw: true, nest: true});
    const response = [];
    for (let workingGroup of allWorkingGroup) {
        const admins = [];
        workingGroup.admin = JSON.parse(workingGroup.admin);
        if (id && !workingGroup.admin.includes(id)) {
            continue;
        }
        const workingGroupAgency = await WorkingGroupAgency.findAll({where: {groupId: workingGroup.id}, include: [Agency], raw: true, nest: true});
        for (const item of workingGroup.admin) {
            const user = await User.findByPk(item);
            admins.push(user);
        }

        const packageGroup = await PackageGroup.findAll({where: {groupId: workingGroup.id}, include: [Package], raw: true, nest: true});

        response.push({...workingGroup, admins, agency: workingGroupAgency, packages: packageGroup});
    }
    res.status(200).json(response)
}

exports.delete = async (req, res) => {
    const allPackageGroup = await PackageGroup.findAll({where: {groupId: req.params.id}});
    if (allPackageGroup.length > 0) {
        res.status(400).json({message: 'This item can\'t delete.', status: 400});
        return;
    }
    WorkingGroup.destroy({where: {id: req.params.id}}).then(() => {
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
            await PackageGroup.destroy({where: {groupId: id}});
            for (const packageId of data.packageIds) {
                await PackageGroup.create({
                    groupId: id,
                    packageId: packageId
                });
            }
        }
        WorkingGroup.findOne({where: {id}, include: [Calendar], raw: true, nest: true}).then(async (workingGroup) => {
            const admins = [];
            workingGroup.admin = JSON.parse(workingGroup.admin);
            for (const item of workingGroup.admin) {
                const user = await User.findByPk(item);
                admins.push(user);
            }
            const workingGroupAgency = await WorkingGroupAgency.findAll({where: {groupId: workingGroup.id}, include: [Agency], raw: true, nest: true})

            const packageGroup = await PackageGroup.findAll({where: {groupId: workingGroup.id}, include: [Package], raw: true, nest: true});

            res.status(200).json({...workingGroup, admins, agency: workingGroupAgency, packages: packageGroup});
        });
    });
}
