import db from '../models';

const AdditionalPackage = db.additionalPackage;

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
    let query = {};
    if (req.query.status) {
        query.status = req.query.status;
    }
    const allPackage = await AdditionalPackage.findAll({where: query});
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
        AdditionalPackage.findByPk(id).then(updatedPackage => {
            res.json(updatedPackage);
        });
    });
}
