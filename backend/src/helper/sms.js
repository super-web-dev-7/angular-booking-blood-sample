import Axios from 'axios';
import db from '../models';

/*
sms_data = {
    subject: 'sms subject',
    receiver: id,
    phoneNumber: '1234567890',
    content: 'sms content'
}
*/

const SMSHistory = db.smsHistory;
export const sendSMS = async (data) => {
    const SMSData = {
        recipientAddressList: ['49' + data.phoneNumber],
        messageContent: data.content,
    };
    if (process.env.NODE_ENV === 'development') {
        return false;
    }
    console.log('dddd');
    return Axios({
        method: 'POST',
        url: 'https://api.websms.com/rest/smsmessaging/text',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'api.websms.com',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + process.env.SMS_BASIC_TOKEN
        },
        data: SMSData
    }).then(async (res) => {
        console.log(res.data.statusCode);
        data.status = true;
        await SMSHistory.create(data);
        return true;
    }).catch(async error => {
        console.log(error);
        data.status = false;
        await SMSHistory.create(data);
        return false;
    });
}
