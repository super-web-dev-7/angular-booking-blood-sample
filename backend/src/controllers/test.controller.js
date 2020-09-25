import {PostalCode} from '../utils';
import db from '../models';

const DistrictModel = db.districtModel;

export const ping = (req, res, next) => {
    res.send('Pong');
};

export const insertDistrict = () => {
    for (let item of PostalCode) {
        const data = {
            name: item.letter,
            zipcode: JSON.stringify(item.values)
        };
        DistrictModel.create(data);
    }
}
