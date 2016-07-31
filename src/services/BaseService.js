import L from '../utils/Log';

const HTTP = 'http://';
const HOST = 'api.lazywaimai.com/';
const API_VERSION = 'v1/';
const BASE_URL = HTTP + HOST + API_VERSION;

class BaseService {

  getRequest(url, params, headers) {
    url += `?${this.toQueryString(params)}`;
    return fetch(url, {
      method: 'GET',
      headers
    }).then(response => this.parseResponse(response));
  }

  postRequest(url, params, headers) {
    return fetch(url, {
      method: 'POST',
      headers,
      body: this.toQueryString(params)
    }).then(response => this.parseResponse(response));
  }

  request(path, method = 'GET', params) {
    const url = BASE_URL + path;
    if (method === 'GET') {
      return this.getRequest(url, params, this.buildHeaders());
    }
    return this.postRequest(url, params, this.buildHeaders());
  }

  buildHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': '',
      'Http-Timestamp': '1456847324345',
      'Http-App-Version': '1.0',
      'Http-Device-Id': '99000566712916',
      'Http-Device-Type': 'android'
    };
  }

  toQueryString(params) {
    return params ? Object.keys(params).map((key) => {
      const val = params[key];
      if (Array.isArray(val)) {
        return val.map((val2) => `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`).join('&');
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    }).join('&') : '';
  }

  parseResponse(response) {
    return response.json().then(json => {
      if (response.status === 200) {
        return json;
      } else {
        throw new Error(json.message, json.status);
      }
    });
  }
}

export default BaseService;
