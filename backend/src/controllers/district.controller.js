import db from '../models';

const District = db.district;
const Calendar = db.calendar;

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
    District.update(data, {returning: true, where: {id}}).then((rowsUpdated) => {
        res.json(rowsUpdated);
    });
}