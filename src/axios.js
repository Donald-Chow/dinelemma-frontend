import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
  ? 'https://dinelemma-backend-8c6da2f0be62.herokuapp.com/'
  : 'http://localhost:3000/';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if the signature expire, ask the use to sign in again
    if (error.response.data == 'Signature has expired') {
      window.alert('Your session has expired')
      localStorage.removeItem('Authorization')
      router.push({ name: 'SigninView'});
    }
    return Promise.reject(error);
  }
);
