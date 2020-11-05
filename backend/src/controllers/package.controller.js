import db from '../models';

const Package = db.package;
const Appointment = db.appointment;

exports.create = (req, res) => {
    const newPackage = {
        name: req.body.name,
        number: req.body.number,
        price: req.body.price,
        special_price: req.body.special_price,
        isActive: req.body.isActive,
        status: req.body.status,
        content: req.body.content
    };
    Package.create(newPackage).then(async data => {
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        });
    });
};

exports.get = async (req, res) => {
    const allPackage = await Package.findAll({raw: true, nest: true});
    res.status(200).json(allPackage);
}

exports.getAllPackagesWithAppointment = async (req, res) => {
    const allPackages = await db.sequelize.query(`
    SELECT 
        packages.id AS id, packages.name AS name, COUNT(appointments.id) AS total 
    FROM packages 
    LEFT JOIN appointments ON appointments.packageId=packages.id 
    WHERE appointments.userId=${req.params.userId}
    GROUP BY packages.id`, {type: db.Sequelize.QueryTypes.SELECT});
    res.status(200).json(allPackages);
}

exports.getWithQuery = async (req, res) => {
    const allPackage = await Package.findAll({where: {status: req.query.status}, raw: true, nest: true});
    res.status(200).json(allPackage);
}

exports.delete = async (req, res) => {
    const appointment = await Appointment.findAll({where: {packageId: req.params.id}});
    if (appointment.length > 0) {
        res.status(400).json({error: 'Appointment has this package'})
        return;
    }
    Package.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {
    const data = {
        name: req.body.name,
        number: req.body.number,
        price: req.body.price,
        special_price: req.body.special_price,
        isActive: req.body.isActive,
        status: req.body.status,
        content: req.body.content
    };
    const id = req.params.id;

    Package.update(data, {returning: true, where: {id}}).then(async () => {
        Package.findByPk(id, {raw: true, nest: true}).then(async updatedPackage => {
            res.json(updatedPackage);
        });
    });
}