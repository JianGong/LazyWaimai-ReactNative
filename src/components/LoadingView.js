import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  BackAndroid
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

class LoadingView extends React.Component {

  componentWillUnmount() {
    // 监听返回键
    BackAndroid.addEventListener('hardwareBackPress', () => {
      console.debug('返回键按下了');
      if (this.loadingView !== undefined) {
        this.hide();
        return true;
      }
      return false;
    });
  }

  show(message) {
    this.loadingView = new RootSiblings(
      <TouchableHighlight style={styles.overlay} underlayColor="transparent" onPress={() => this.hide()}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.loadingText}>{message}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  dismiss() {
    if (this.loadingView !== undefined) {
      this.loadingView.destroy();
    }
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 5,
    fontSize: 13,
    color: '#9e9e9e'
  }
});

export default LoadingView;
