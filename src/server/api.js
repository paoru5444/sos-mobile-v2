import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  }
});

export const baseURL = 'https://sos-libras.herokuapp.com'

AsyncStorage.setItem('apiUrl', baseURL)

api.defaults.baseURL = baseURL

api.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) config.headers.Authorization = "Bearer " + userToken
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// api.interceptors.response.use(function (response) {
//   return response;
// }, async function (error) {
//   if (error.response.status === 401) {    
//     // const response = await api.post('/refresh')
//     // await AsyncStorage.setItem('userToken', response.data.token)
//     alert('Sessão expirada, faça login novamente para utilizar o sistema.')
//   }
//   return Promise.reject(error);
// });

export default api;