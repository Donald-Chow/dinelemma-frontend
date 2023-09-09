import axios from 'axios'

// axios instance for calling google map api
const googleMapsApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    : '/maps-api/maps/api/place/textsearch/json',
  params: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
});

export default googleMapsApi;
