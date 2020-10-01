import db from '../models';

const Appointment = db.appointment;
const Package = db.package;
const User = db.user;
const Agency = db.agency;
const Patient = db.patient;
const sequelize = db.sequelize;


exports.create = async (req, res) => {
    const newAppointment = req.body;
    Appointment.create(newAppointment).then(data => {
        res.status(201).json(data);
    }).catch(e => {
        res.status(400).send({
            message: e.errors[0].message || 'Some error occurred.'
        })
    });
}

exports.get = async (req, res) => {
    const allAppointment = await Appointment.findAll({where: {}, include: [User, Package, Agency]});
    let response = [];
    for (const appointment of allAppointment) {
        const doctors_id = JSON.parse(appointment.agency.doctors_id);
        const doctors = [];
        for (const id of doctors_id) {
            const doctor = await User.findByPk(id);
            doctors.push({
                id: doctor.id,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                email: doctor.email,
                phoneNumber: doctor.phoneNumber
            });
        }
        const nurse = await sequelize.query(`
        SELECT users.id, users.email, users.firstName, users.lastName, users.phoneNumber FROM users
        JOIN calendars ON users.id = calendars.nurse
        JOIN working_groups ON working_groups.calendar_id = calendars.id
        JOIN agencies ON agencies.group_id = working_groups.id
        WHERE agencies.group_id = ${appointment.agency.group_id}
        `);
        const patient = await Patient.findOne({where: {user_id: appointment.user.id}});
        response.push({...appointment.dataValues, doctors, nurse: nurse[0][0], patient})
    }
    res.status(200).json(response);
}

exports.delete = async (req, res) => {
    Appointment.destroy({where: {id: req.params.id}}).then(() => {
        res.status(204).json({});
    })
}

exports.update = async (req, res) => {

}