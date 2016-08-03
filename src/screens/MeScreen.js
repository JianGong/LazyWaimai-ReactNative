import React from 'react';
import Button from 'react-native-button';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager
} from 'react-native';
import LoginScreen from './LoginScreen';
import CommonStyles from '../common/CommonStyles';
import CompatToolbar from '../components/CompatToolbar';

class MePage extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress(event) {
    const { navigator } = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: LoginScreen,
        name: 'LoginScreen'
      });
    });
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <CompatToolbar title="个人中心" navigator={navigator} />
        <View style={styles.content}>
          <Text>这是个人中心页面</Text>
          <Button
            containerStyle={[CommonStyles.buttonContainer, { padding: 10 }]}
            style={CommonStyles.buttonText}
            onPress={this.onPress}
          >
            点击去登录
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc'
  },
  toolbar: {
    backgroundColor: '#3F51B5',
    height: 56
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MePage;
