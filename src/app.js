import React from 'react';
import {
  View,
  StatusBar,
  Navigator,
  BackAndroid,
  Platform
} from 'react-native';
import Colors from './common/Colors';
import MainScreen from './screens/MainScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid() {
    const nav = this.navigator;
    if (nav) {
      const routers = nav.getCurrentRoutes();
      if (routers.length > 1) {
        const top = routers[routers.length - 1];
        if (top.ignoreBack || top.component.ignoreBack) {
          return true;
        }
        const handleBack = top.handleBack || top.component.handleBack;
        if (handleBack) {
          return handleBack();
        }
        nav.pop();
        return true;
      }
    }

    return false;
  }

  renderScene(route, navigator) {
    if (this.navigator === undefined) {
      this.navigator = navigator;
    }
    let Component = route.component;
    return (
      <Component route={route} navigator={navigator} />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={Colors.primary_dark}
          barStyle="default"
        />
        <Navigator
          style={{ flex: 1 }}
          configureScene={() => Navigator.SceneConfigs.PushFromRight}
          renderScene={this.renderScene}
          initialRoute={{
            component: MainScreen,
            name: 'MainScreen'
          }}
        />
      </View>
    );
  }
}

export default App;
