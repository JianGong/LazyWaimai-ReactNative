import BaseService from './BaseService';
import AppCookie from '../context/AppCookie';

class UserService extends BaseService {

  login(username, password) {
    const params = {
      username,
      password,
      grant_type: 'password',
      client_id: 'android',
      client_secret: 'afegewlnbnl987nfelwn'
    };
    return super.request('oauth/access_token', 'POST', params)
            .then(token => {
              AppCookie.saveAccessToken(token.access_token);
              return super.request(`users/${token.user_id}`, 'GET');
            }).then(user => {
              AppCookie.saveUserInfo(user);
              return user;
            });
  }
}

const userService = new UserService();
module.exports = userService;
