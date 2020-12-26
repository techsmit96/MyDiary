import * as React from 'react';
import {View} from 'react-native';
import Navigator from './src/utils/navigations/Navigator';
import Reactotron from 'reactotron-react-native';
import {Provider} from 'react-redux';
import Store from './src/redux/reducers';
import SpashScreen from 'react-native-splash-screen';

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.configureReactotron();
    (console as any).tron = Reactotron;
  }
  configureReactotron() {
    Reactotron.clear();
    return Reactotron.configure({
      host: '192.168.1.102',
      port: 9090,
      name: 'ReactNativeCourse',
    }).connect();
  }

  componentDidMount() {
    SpashScreen.hide();
  }

  render() {
    return (
      <Provider store={Store}>
        <Navigator />
      </Provider>
    );
  }
}
