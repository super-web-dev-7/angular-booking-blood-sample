import {PostalCode} from '../utils';
import db from '../models';
import fs from 'fs';
import csv from 'csv-parser';

const DistrictModel = db.districtModel;
const ZipCodeModel = db.zipCodeModel;

exports.ping = (req, res, next) => {
    res.send('Pong');
};

exports.insertDistrict = async () => {
    for (let postalCode of PostalCode) {
        for (const code of postalCode.values) {
            const data = {
                city: 'Berlin',
                district: postalCode.letter,
                zipcode: code
            }
            await DistrictModel.create(data);
        }
    }
}

exports.insertZipCode = async () => {
    const data = [];
    fs.createReadStream('src/utils/zip_codes.csv').pipe(csv()).on('data', async (row) => {
        data.push(row);
    }).on('end', async () => {
        let i=0;
        for (const item of data) {
            console.log(i++);
            await ZipCodeModel.create(item);
        }
        // ZipCodeModel.create(data)
    })

}
