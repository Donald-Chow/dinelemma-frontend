import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
axios.interceptors.response.use(
  function (response) {
    return response; // Don't forget to return the response
  },
  function (error) {
    // if the signature expire, ask the use to sign in again
    if (error.response.data == 'Signature has expired') {
      window.alert('Your session has expired')
      localStorage.removeItem('Authorization')
      router.push({ name: 'SigninView'});
    }
    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

const googleMapsApi = axios.create({
  baseURL: '/maps-api/maps/api/place/textsearch/json',
  params: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },

});

export default googleMapsApi;
