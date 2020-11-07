import db from '../models';

const District = db.district;
const Calendar = db.calendar;
const DistrictModel = db.districtModel;
const sequelize = db.sequelize;

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

exports.getUnassigned = async (req, res) => {
    const allDistrict = await District.findAll({where: {isActive: true}});
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

exports.getAvailablePostalCode = async (req, res) => {
    const adminId = parseInt(req.params.adminId);
    console.log(adminId);
    const response = [];
    const workingGroups = await db.workingGroup.findAll({raw: true});
    let value;
    for (const workingGroup of workingGroups) {
        const admins = JSON.parse(workingGroup.admin);
        if (admins.includes(adminId)) {
            value = workingGroup;
            break;
        }
    }
    if (value) {
        const calendar = await Calendar.findOne({where: {id: value.calendar_id}, raw: true});
        const districtIds = JSON.parse(calendar.district_id);
        for (const districtId of districtIds) {
            const district = await District.findOne({where: {id: districtId}, raw: true});
            const districtModels = await DistrictModel.findAll({where: {city: district.city, district: district.district}});
            for (const districtModel of districtModels) {
                response.push(districtModel);
            }
        }
    }
    res.status(200).json(response);
}
//
// exports.getAvailablePostalCodeByNurse = async (req, res) => {
//
// }

exports.delete = async (req, res) => {
    const allCalendar = await Calendar.findAll({where: {}});
    for (const calendar of allCalendar) {
        const district = JSON.parse(calendar.district_id);
        if (district.includes(parseInt(req.params.id))) {
            res.status(400).json({message: 'This item can\'t delete.', status: 400});
            return;
        }
    }

    District.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = req.body;
    const id = parseInt(req.params.id, 10);
    if (!data.isActive) {
        const district = await District.findByPk(id, {raw: true});
        if (district.isActive) {
            const allCalendar = await Calendar.findAll({raw: true});
            for (const calendar of allCalendar) {
                let districtIds = JSON.parse(calendar.district_id);
                if (districtIds.includes(id)) {
                    if (districtIds.length > 2) {
                        districtIds = districtIds.filter(item => item !== id);
                        await Calendar.update({district_id: JSON.stringify(districtIds)}, {where: {id: calendar.id}});
                    } else {
                        res.status(400).json({message: 'You can\'t inactive this.'});
                        return;
                    }
                }
            }
        }
    }
    District.update(data, {returning: true, where: {id}}).then(async () => {
        const updatedDistrict = await District.findByPk(id);
        res.json(updatedDistrict);
    });
}

exports.getModel = async (req, res) => {
    // const allModels = await DistrictModel.findAll({where: {}, group: ['district']});
    const allModels = await sequelize.query(`
    SELECT * 
    FROM district_models 
    WHERE ( 
        city NOT IN (SELECT city FROM districts) OR 
        district NOT IN (SELECT district FROM districts)
        ) 
    GROUP BY district, city`,
        {type: db.Sequelize.QueryTypes.SELECT}
    );
    res.status(200).json(allModels);
}