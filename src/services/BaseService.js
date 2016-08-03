import AppCookie from '../context/AppCookie';
import StringUtil from '../utils/StringUtil';

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
    const headers = this.buildDefaultHeaders();

    return new Promise((resolve, reject) => {
      AppCookie.getAccessToken()
        .then(accessToken => {
          if (!StringUtil.isEmpty(accessToken)) {
            headers.append('Authorization', `Bearer ${accessToken}`);
          }

          console.log(`请求的URL：${url}`);
          console.log('请求的header：');
          console.log(headers);

          if (method === 'GET') {
            return this.getRequest(url, params, headers);
          } else {
            return this.postRequest(url, params, headers);
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  buildDefaultHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Http-Timestamp', '1456847324345');
    headers.append('Http-App-Version', '1.0');
    headers.append('Http-Device-Id', '99000566712916');
    headers.append('Http-Device-Type', 'android');

    return headers;
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
      console.log(json);
      if (response.status === 200) {
        return json;
      } else {
        throw new Error(json.message);
      }
    });
  }
}

export default BaseService;
