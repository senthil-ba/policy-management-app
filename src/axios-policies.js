import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://policy-management-app-97345.firebaseio.com/'
});

export default instance;