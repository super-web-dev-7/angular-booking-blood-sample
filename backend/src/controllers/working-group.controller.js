import db from '../models';

const WorkingGroup = db.workingGroup;

exports.create = (req, res) => {
    console.log(req.body);
    res.json({message: 'OK'})
};
