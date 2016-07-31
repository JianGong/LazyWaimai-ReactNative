import React from 'react';
import {
  View,
  StatusBar,
  ToolbarAndroid,
  Text,
  StyleSheet
} from 'react-native';

class MePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#303F9F" />
        <ToolbarAndroid style={styles.toolbar} title="个人中心" titleColor="#FFFFFF" />
        <View style={styles.content}>
          <Text>这是个人中心页面</Text>
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
