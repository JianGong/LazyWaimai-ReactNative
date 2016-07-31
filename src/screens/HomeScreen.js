import React from 'react';
import {
  View,
  StatusBar,
  ToolbarAndroid,
  Text,
  Image,
  ListView,
  RefreshControl,
  StyleSheet
} from 'react-native';
import businessService from '../services/BusinessService';
import CommonStyles from '../common/CommonStyles';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      refreshing: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData();
  }

  fetchData() {
    businessService.businesses()
      .then(result => {
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(result.items) });
      }).catch(err => {
        // this.setState({
        //   logining: false,
        //   loginError: err.message,
        // });
      }).done(() => {
        if (this.state.refreshing) {
          this.setState({ refreshing: false });
        } else if (!this.state.loaded) {
          this.setState({ loaded: true });
        }
      });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#303F9F" />
        <ToolbarAndroid style={styles.toolbar} title="首页" titleColor="#FFFFFF" />
        <View style={styles.loadingView}>
          <Text>正在加载电影数据……</Text>
        </View>
      </View>
    );
  }

  renderItem(business) {
    return (
      <View style={styles.listItem}>
        <Image
          source={{ uri: business.pic_url }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{business.name}</Text>
          <Text style={styles.monthSales}>月售{business.month_sales}份</Text>
          <View style={styles.feeRelated}>
            <Text style={styles.feeItem}>起送价￥{business.min_price}</Text>
            <Text style={styles.feeItem}>配送费￥{business.shipping_fee}</Text>
            <Text style={styles.feeItem}>平均配送{business.shipping_time}分钟</Text>
          </View>
        </View>
      </View>
    );
  }

  renderSeperator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={CommonStyles.divider} />
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#303F9F" />
        <ToolbarAndroid style={styles.toolbar} title="首页" titleColor="#FFFFFF" />
        <ListView
          dataSource={this.state.dataSource}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          renderRow={this.renderItem}
          renderSeparator={this.renderSeperator}
          style={styles.listView}
        />
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listView: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  listItem: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  thumbnail: {
    width: 60,
    height: 60,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#DCDCDC'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 15,
    color: '#424242',
    marginTop: 10
  },
  monthSales: {
    fontSize: 12,
    color: '#9e9e9e'
  },
  feeRelated: {
    flexDirection: 'row',
    marginBottom: 10
  },
  feeItem: {
    fontSize: 12,
    color: '#9e9e9e',
    marginRight: 5
  }
});

export default HomeScreen;
