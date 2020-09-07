import db from '../models';

const Template = db.template;

exports.create = (req, res) => {
    const newTemplate = req.body;
    Template.create(newTemplate).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.errors[0].message || 'Some error occurred.'
        })
    })
};

exports.get = async (req, res) => {
    const allTemplate = await Template.findAll({where: {}});
    res.status(200).json(allTemplate);
}

exports.delete = async (req, res) => {
    Template.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}

exports.update = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Template.update(data, {returning: true, where: {id}}).then((rowsUpdated) => {
        res.json(rowsUpdated);
    });
}
