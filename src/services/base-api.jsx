import axios from 'axios';
export default axios.create({
  baseURL: 'https://billingappserver-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
  }
});