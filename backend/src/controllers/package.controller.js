import db from '../models';

const Package = db.package;
const WorkingGroup = db.workingGroup;

exports.create = (req, res) => {
    const newPackage = req.body;
    Package.create(newPackage).then(data => {
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        })
    });
};

exports.get = async (req, res) => {
    WorkingGroup.hasMany(Package, {foreignKey: 'group_id'});
    Package.belongsTo(WorkingGroup, {foreignKey: 'group_id'});
    const allPackage = await Package.findAll({where: {}, include: [WorkingGroup]});
    res.status(200).json(allPackage);
}

exports.delete = async (req, res) => {
    Package.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Package.update(data, {returning: true, where: {id}}).then(() => {
        WorkingGroup.hasMany(Package, {foreignKey: 'group_id'});
        Package.belongsTo(WorkingGroup, {foreignKey: 'group_id'});
        Package.findByPk(id, {include: [WorkingGroup]}).then(updatedPackage => {
            res.json(updatedPackage);
        });
    });
}