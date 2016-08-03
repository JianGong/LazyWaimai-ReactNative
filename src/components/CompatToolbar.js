import React, { PropTypes } from 'react';
import {
	StyleSheet,
	ToolbarAndroid,
	Platform,
	View,
	Text
} from 'react-native';
import Button from 'react-native-button';
import Colors from '../common/Colors';

let showActionButton = false;
const iconLeft = require('../assets/icon_left.png');
const iconLeftIOS = require('../assets/icon_left_ios.png');

const propTypes = {
  title: PropTypes.string,
  actions: PropTypes.array,
  navigator: PropTypes.object,
  onActionSelected: PropTypes.func,
  onIconClicked: PropTypes.func,
  navIcon: PropTypes.number
};

const CompatToolbar = ({
  title,
  actions,
  navigator,
  onActionSelected,
  onIconClicked,
  navIcon
}) => {
  const handleIconClicked = () => {
    if (onIconClicked) {
      onIconClicked();
    } else {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
      }
    }
  };

  const isShowUp = () => {
    if (navigator) {
      const routes = navigator.getCurrentRoutes();
      return routes.length > 1;
    }
    return false;
  };

  const renderToolbarAndroid = () => (
    <ToolbarAndroid
      style={styles.toolbar}
      actions={actions}
      onActionSelected={onActionSelected}
      onIconClicked={handleIconClicked}
      navIcon={isShowUp() ? iconLeft : undefined}
      titleColor="#fff"
      title={title}
    />
  );

  const renderToolbarIOS = () => {
    const action = actions[0];
    showActionButton = action !== undefined;
    return (
      <View style={styles.toolbar}>
        <Button
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          source={navIcon === undefined ? iconLeftIOS : navIcon}
          style={styles.leftIOS}
          onPress={handleIconClicked}
        />
        <Text
          style={[styles.titleIOS,
          showActionButton ? { paddingLeft: 0 } : { paddingLeft: -35 }]}
        >
          {title}
        </Text>
        {showActionButton && action.show === 'always' ?
          <Button
            containerStyle={showActionButton ? styles.rightIOS : { height: 0, width: 0 }}
            source={action.icon}
            onPress={onActionSelected}
          /> :
          <Button
            containerStyle={showActionButton ? styles.rightIOS : { height: 0, width: 0 }}
            style={styles.rightText}
            text={showActionButton ? action.title : ''}
            onPress={onActionSelected}
          />
        }
      </View>
    );
  };

  const Toolbar = Platform.select({
    android: () => renderToolbarAndroid(),
    ios: () => renderToolbarIOS()
  });

  return <Toolbar />;
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    height: 58
  },
  titleIOS: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
  },
  leftIOS: {
    height: 15,
    width: 25,
    marginTop: 20,
    marginLeft: 10
  },
  rightIOS: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10
  },
  rightText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  }
});

CompatToolbar.propTypes = propTypes;

CompatToolbar.defaultProps = {
  onActionSelected() {},
  title: '',
  actions: []
};

export default CompatToolbar;
