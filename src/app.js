import React from 'react';
import MainScreen from './screens/MainScreen';
// import LoginScreen from './screens/LoginScreen';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     splashed: false
  //   };
  // }

  // componentDidMount() {
  //   this.setTimeout(() => {
  //     this.setState({
  //       splashed: true
  //     });
  //   }, 2000);
  // }

  render() {
    // if (this.state.splashed) {
    return (
      <MainScreen />
      // <LoginScreen />
    );
    // } else {
    //   return (
    //     <SplashScreen />
    //   );
    // }
  }
}

export default App;
