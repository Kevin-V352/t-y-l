import axios from 'axios';

const tylAPI = axios.create({
  baseURL: '/api'
});

export default tylAPI;
