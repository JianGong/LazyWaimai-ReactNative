import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import CompatToolbar from '../components/CompatToolbar';

class OrdersPage extends React.Component {
  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <CompatToolbar title="历史订单" navigator={navigator} />
        <View style={styles.content}>
          <Text>这是历史订单页面</Text>
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

export default OrdersPage;
