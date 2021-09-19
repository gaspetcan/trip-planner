import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = response => response;

const requests = {
  get: url => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: url => axios.delete(url).then(responseBody),
};

const Photos = {
  list: () => requests.get('/reports'),
  details: reportId => requests.get(`/reports/${reportId}`),
};

export default { Photos };
