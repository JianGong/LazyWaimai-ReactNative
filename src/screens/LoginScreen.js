import React from 'react';
import {
  View,
  ToolbarAndroid,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import CommonStyles from '../common/CommonStyles';

const nameIcon = require('../assets/login_name.png');
const passwordIcon = require('../assets/login_password.png');

class LoginScreen extends React.Component {

  handlePress(event) {

  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <ToolbarAndroid style={CommonStyles.toolbar} title="用户登录" titleColor="#FFFFFF" />
        <View style={CommonStyles.wrapper}>

          <View style={styles.loginPanel}>
            <View style={styles.loginItem}>
              <Image source={nameIcon} style={styles.icon} />
              <TextInput style={styles.input} placeholder="用户名/手机号/邮箱" placeholderTextColor="#9E9E9E" />
            </View>
            <View style={CommonStyles.divider} />
            <View style={styles.loginItem}>
              <Image source={passwordIcon} style={styles.icon} />
              <TextInput style={styles.input} placeholder="请输入密码" placeholderTextColor="#9E9E9E" />
            </View>
          </View>

          <Button
            style={styles.button}
            styleDisabled={{ color: 'red' }}
            onPress={this.handlePress}
          >
            登录
          </Button>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginPanel: {
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 3,
    margin: 13
  },
  loginItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 8
  },
  input: {
    flex: 1,
    color: '#424242',
    alignSelf: 'stretch',
    backgroundColor: '#00000000'
  },
  button: {
    marginLeft: 13,
    marginRight: 13,
    fontWeight: 'normal',
    fontSize: 15,
    color: '#FFFFFF',
    borderRadius: 4,
    backgroundColor: '#3F51B5',
  }
});

export default LoginScreen;
