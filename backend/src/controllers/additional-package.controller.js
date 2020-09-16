import db from '../models';

const AdditionalPackage = db.additionalPackage;
const Package = db.package;

exports.create = (req, res) => {
    const newPackage = req.body;
    AdditionalPackage.create(newPackage).then(data => {
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        })
    });
};

exports.get = async (req, res) => {
    Package.hasMany(AdditionalPackage, {foreignKey: 'package_id'});
    AdditionalPackage.belongsTo(Package, {foreignKey: 'package_id'});
    const allPackage = await AdditionalPackage.findAll({where: {}, include: [Package]});
    res.status(200).json(allPackage);
}

exports.delete = async (req, res) => {
    AdditionalPackage.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    AdditionalPackage.update(data, {returning: true, where: {id}}).then(() => {
        Package.hasMany(AdditionalPackage, {foreignKey: 'package_id'});
        AdditionalPackage.belongsTo(Package, {foreignKey: 'package_id'});
        AdditionalPackage.findByPk(id, {include: [Package]}).then(updatedPackage => {
            res.json(updatedPackage);
        });
    });
}
