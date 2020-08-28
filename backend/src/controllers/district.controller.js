import db from '../models';
import bcrypt from "bcrypt";

const District = db.district;

exports.create = (req, res) => {
    const newDistrict = req.body;
    District.create(newDistrict).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.errors[0].message || 'Some error occurred.'
        })
    })
};

exports.get = async (req, res) => {
    const allDistrict = await District.findAll({where: {}});
    res.status(200).json(allDistrict);
}


exports.delete = async (req, res) => {
    District.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    District.update(data, {returning: true, where: {id}}).then((rowsUpdated) => {
        res.json(rowsUpdated);
    });
}