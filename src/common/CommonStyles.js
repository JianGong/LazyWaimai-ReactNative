import { StyleSheet } from 'react-native';
import Colors from './Colors';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#3F51B5',
    height: 56
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.light_gray_bg
  },
  divider: {
    backgroundColor: Colors.divider,
    height: 0.5,
  },
  buttonText: {
    fontWeight: 'normal',
    fontSize: 15,
    color: '#FFFFFF'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#3F51B5'
  }
});

module.exports = CommonStyles;
