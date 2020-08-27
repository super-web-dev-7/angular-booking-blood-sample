import db from '../models';

const WorkingGroup = db.workingGroup;

exports.create = (req, res) => {
    console.log(req.body);
    res.json({message: 'OK'})
};

exports.get = async (req, res) => {
    console.log('OK');
    const allWorkingGroup =await WorkingGroup.findAll({where: {}});
    res.status(200).json(allWorkingGroup)
}
