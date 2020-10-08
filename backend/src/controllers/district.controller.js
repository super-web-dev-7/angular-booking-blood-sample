import db from '../models';

const District = db.district;
const Calendar = db.calendar;
const DistrictModel = db.districtModel;

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
    DistrictModel.hasMany(District, {foreignKey: 'model'});
    District.belongsTo(DistrictModel, {foreignKey: 'model'});
    const allDistrict = await District.findAll({where: {}, include: [DistrictModel]});
    res.status(200).json(allDistrict);
}

exports.getUnassigned = async (req, res) => {
    DistrictModel.hasMany(District, {foreignKey: 'model'});
    District.belongsTo(DistrictModel, {foreignKey: 'model'});
    const allDistrict = await District.findAll({where: {}, include: [DistrictModel]});
    const unassignedDistrict = [];
    for (const district of allDistrict) {
        let include = false;
        const allCalendars = await Calendar.findAll();
        for (const calendar of allCalendars) {
            const districtIds = JSON.parse(calendar.district_id);
            if (districtIds.includes(district.id)) {
                include = true;
                break;
            }
        }
        if (!include) {
            unassignedDistrict.push(district);
        }
    }
    res.status(200).json(unassignedDistrict);
}

exports.delete = async (req, res) => {
    const allCalendar = await Calendar.findAll({where: {}});
    for (const calendar of allCalendar) {
        const district = JSON.parse(calendar.district_id);
        if (district.includes(parseInt(req.params.id))) {
            res.status(400).json({message: 'This item can\'t delete.', status: 400});
            return;
        }
    }

    District.destroy({where: {id: req.params.id}}).then(result => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    District.update(data, {returning: true, where: {id}}).then(async (rowsUpdated) => {
        // res.json(rowsUpdated);
        DistrictModel.hasMany(District, {foreignKey: 'model'});
        District.belongsTo(DistrictModel, {foreignKey: 'model'});
        const updatedDistrict = await District.findByPk(id, {include: [DistrictModel]})
        res.json(updatedDistrict);
    });
}

exports.getModel = async (req, res) => {
    const allModels = await DistrictModel.findAll({where: {}});
    for (let model of allModels) {
        model.zipcode = JSON.parse(model.zipcode);
    }
    res.status(200).json(allModels);
}