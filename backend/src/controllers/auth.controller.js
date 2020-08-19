import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import config from '../config/config';

const User = db.user;
const Op = db.Sequelize.Op;

const saltRounds = 10;

exports.register = (req, res) => {
    const newUser = req.body;
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        newUser.password = hash;
        newUser.role = 'patient'
        User.create(newUser).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.errors[0].message || "Some error occurred while registering"
            });
        });
    })
};

exports.login = async (req, res) => {
    const auth_data = req.body;
    const user = await User.findOne({where: {email: auth_data.email.toLowerCase()}}).then(res => {
        return res;
    });
    if (user) {
        const passwordIsValid = bcrypt.compareSync(auth_data.password, user.password);
        if (passwordIsValid) {
            // Passwords match
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            }, config.jwtSecret, {
                expiresIn: 86400 * 30    //expires in 24 hours
            });
            res.json({token});
        } else {
            // Passwords don't match
            res.status(400).send({
                message: 'Incorrect Username Or Password!'
            });
        }
    } else {
        res.status(400).send({
            message: 'Incorrect Username Or password!'
        });
    }
}