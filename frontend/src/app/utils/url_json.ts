import {environment} from '../../environments/environment';

const BASE_URL = environment.BASE_URL;
const API_URL = environment.API_URL;

export const URL_JSON = {
  AUTH: API_URL + 'auth',
  DASHBOARD: API_URL + 'dashboard'
};
