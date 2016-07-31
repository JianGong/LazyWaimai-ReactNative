import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeScreen from './HomeScreen';
import OrdersScreen from './OrdersScreen';
import MeScreen from './MeScreen';

const homeNormalIcon = require('../assets/ic_home_normal.png');
const homeSelectedIcon = require('../assets/ic_home_selected.png');
const ordersNormalIcon = require('../assets/ic_orders_normal.png');
const ordersSelectedIcon = require('../assets/ic_orders_selected.png');
const meNormalIcon = require('../assets/ic_me_normal.png');
const meSelectedIcon = require('../assets/ic_me_selected.png');

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
    return (
      <TabNavigator style={{ backgroundColor: 'red' }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Image source={homeNormalIcon} style={styles.tabItemIcon} />}
          renderSelectedIcon={() => <Image source={homeSelectedIcon} style={styles.tabItemIcon} />}
          onPress={() => this.setState({ selectedTab: 'home' })}
        >
          <HomeScreen />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'orders'}
          title="订单"
          renderIcon={() => <Image source={ordersNormalIcon} style={styles.tabItemIcon} />}
          renderSelectedIcon={() => <Image source={ordersSelectedIcon} style={styles.tabItemIcon} />}
          onPress={() => this.setState({ selectedTab: 'orders' })}
        >
          <OrdersScreen />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'me'}
          title="我的"
          renderIcon={() => <Image source={meNormalIcon} style={styles.tabItemIcon} />}
          renderSelectedIcon={() => <Image source={meSelectedIcon} style={styles.tabItemIcon} />}
          onPress={() => this.setState({ selectedTab: 'me' })}
        >
          <MeScreen />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  tabItemIcon: {
    width: 25,
    height: 25
  }
});

export default MainContainer;
