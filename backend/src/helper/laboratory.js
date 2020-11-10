import Axios from 'axios';

/*
data = {
    url: '/engagement',
    method: 'POST',
    body: {}
}
*/
const LA_BASE_URL = process.env.LA_BASE_URL;

const API_KEY = process.env.LA_API_KEY;
const CLIENT_SECRET = process.env.LA_CLIENT_SECRET;

export const call = async (data) => {
    data.body = {...data.body, apiKey: API_KEY, clientSecret: CLIENT_SECRET};
    return Axios({
        method: data.method,
        url: LA_BASE_URL + data.url,
        data: data.body
    }).then((res) => {
        console.log(res);
        return true;
    }).catch(error => {
        console.log(error);
        return false;
    });
}