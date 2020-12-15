/* eslint-disable no-console */
import axios from 'axios';

let requestHeaders = {
  'X-Requested-With': 'XMLHttpRequest'
};

console.log(process.env);

if (process.env.VUE_APP_LFM_CSRF_TOKEN !== 'OFF' || process.env.MIX_LFM_CSRF_TOKEN !== 'OFF') {
  // CSRF token
  const token = document.head.querySelector('meta[name="csrf-token"]');

  if (!token) {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
  } else {
    requestHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token.content,
    };
  }
}

const HTTP = axios.create({
  baseURL: `${location.protocol}//${location.hostname}/file-manager/`,
  headers: requestHeaders,
});

export default HTTP;
