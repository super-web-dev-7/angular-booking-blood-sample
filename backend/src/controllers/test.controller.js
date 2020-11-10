import fs from 'fs';
import csv from 'csv-parser';
import {v1 as UUID} from 'uuid';

import {PostalCode} from '../utils';
import db from '../models';
import {call} from "../helper/laboratory";

const DistrictModel = db.districtModel;
const ZipCodeModel = db.zipCodeModel;

exports.ping = async (req, res) => {
    const engagementID = UUID();
    const data = {
        url: '/engagement',
        method: 'PUT',
        body: {
            engagementID,
            patientId: '',
            workingGroupID: '',
            profileID: '',
            appointment: '2020-11-10T00:00:00Z',
            pFirstName: '',
            pLastName: '',
            pDateOfBirth: '2010-11-9T00:00:00Z',
            pEmail: '',
            pAddress: '',
            pPostalCode: '',
            pCity: 'Berlin',
            pCountryCode: 'DE',
            pGender: 'm',
            pAnamnesis: {}
        }
    };
    console.log(new Date('2020-11-10'))
    // await call({
    //     url: '',
    //     method: 'POST',
    //     body: {}
    // });
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
