import Axios from "axios";
import db from '../models';

const SMSHistory = db.smsHistory;
export const sendSMS = async (data) => {
    const SMSData = {
        recipientAddressList: [data.phoneNumber],
        messageContent: data.content,
    };
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
