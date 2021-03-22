import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stage.actie.ru/api/v1/checks/winners',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Actie-Promo-Action': '0a3cfda0-21fb-4510-878a-8016a0c18e15',
  },
});

export default instance;
