import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import LoadingView from '../components/LoadingView';
import CompatToolbar from '../components/CompatToolbar';
import CommonStyles from '../common/CommonStyles';
import Colors from '../common/Colors';
import { toastShort } from '../utils/ToastUtil';
import StringUtil from '../utils/StringUtil';
import userService from '../services/UserService';

const nameIcon = require('../assets/login_name.png');
const passwordIcon = require('../assets/login_password.png');

const loadingView = new LoadingView();

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    if (StringUtil.isEmpty(this.account)) {
      toastShort('账户不能为空');
      return;
    }
    if (StringUtil.isEmpty(this.password)) {
      toastShort('密码不能为空');
      return;
    }
    loadingView.show('正在登录');
    userService.login(this.account, this.password)
      .then(user => {
        toastShort('登录成功');
      }).catch(error => {
        toastShort(error.message);
      }).done(() => {
        loadingView.dismiss();
      });
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={CommonStyles.container}>
        <CompatToolbar title="用户登录" navigator={navigator} />
        <View style={CommonStyles.wrapper}>

          <View style={styles.loginPanel}>
            <View style={styles.loginItem}>
              <Image source={nameIcon} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="用户名/手机号/邮箱"
                placeholderTextColor="#9E9E9E"
                onChangeText={(text) => {
                  this.account = text;
                }}
              />
            </View>
            <View style={CommonStyles.divider} />
            <View style={styles.loginItem}>
              <Image source={passwordIcon} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="请输入密码"
                placeholderTextColor="#9E9E9E"
                onChangeText={(text) => {
                  this.password = text;
                }}
              />
            </View>
          </View>

          <Button
            containerStyle={[CommonStyles.buttonContainer, styles.button]}
            style={CommonStyles.buttonText}
            onPress={() => this.doLogin()}
          >
            登录
          </Button>
          <View style={styles.linkContainer}>
            <Button style={styles.link}>忘记密码？</Button>
            <Button style={styles.link}>去注册</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginPanel: {
    margin: 13,
    borderColor: '#DCDCDC',
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: 'white'
  },
  loginItem: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 21,
    height: 21,
    marginLeft: 8,
    marginRight: 8
  },
  input: {
    flex: 1,
    color: '#424242',
    fontSize: 15,
    alignSelf: 'stretch',
    backgroundColor: '#00000000'
  },
  button: {
    height: 45,
    marginLeft: 13,
    marginRight: 13
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 13,
    marginTop: 20
  },
  link: {
    fontSize: 15,
    fontWeight: 'normal',
    color: Colors.primary_text
  }
});

export default LoginScreen;
