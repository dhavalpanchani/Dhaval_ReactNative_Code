const { envConfig } = require('../config/config');
const BASE_URL = envConfig.BASE_URL;

const API = {
  /** AUTH **/
  LOGIN: BASE_URL + 'login',
  REGISTER: BASE_URL + 'register',

  /** USER POST DETAILS **/

  // This base URL use for testing demonstration perpose

  GET_POST_DETAILS: 'https://gorest.co.in/public/v1/' + 'posts',
};

export default API;
