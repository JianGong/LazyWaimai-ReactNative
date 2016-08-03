import { Component } from 'react';
import { AsyncStorage } from 'react-native';

const KEY_USER_INFO = 'user_info';
const KEY_ACCESS_TOKEN = 'access_token';

class AppCookie extends Component {

  static isLogin() {
    const token = this.getAccessToken();

    return token !== null;
  }

  static saveUserInfo(user) {
    try {
      AsyncStorage.setItem(KEY_USER_INFO, JSON.stringify(user));
    } catch (error) {
      console.log(`存储用户信息错误,错误：${error}`);
    }
  }

  static getUserInfo() {
    try {
      const userInfo = AsyncStorage.getItem(KEY_USER_INFO);
      return JSON.parse(userInfo);
    } catch (error) {
      console.log(`读取用户信息失败,错误：${error}`);
    }
    return null;
  }

  static saveAccessToken(accessToken) {
    try {
      AsyncStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.log(`存储Access Token错误,错误：${error}`);
    }
  }

  static getAccessToken() {
    try {
      return AsyncStorage.getItem(KEY_ACCESS_TOKEN);
    } catch (error) {
      console.log(`读取Access Token失败,错误：${error}`);
    }
    return null;
  }
}

export default AppCookie;
