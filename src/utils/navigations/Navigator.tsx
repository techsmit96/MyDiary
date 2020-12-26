import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {appStack, authStack} from './Routes';
import {RootReducerState} from '../../redux/reducers';
import {AsyncStorageService} from '../../services/AsyncStorage';
import {UserActions} from '../../redux/actions/UserActions';
import If from '../../components/If';
import SideNavigation from '../../components/SideNavigation';

interface Props {
  loggedIn: boolean;
  updateUser: any;
}

interface State {
  loading: boolean;
}

class Navigator extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    const user = await AsyncStorageService.getUser();
    if (user) {
      this.props.updateUser(user);
    }
    this.setState({loading: false});
  }
  render() {
    return (
      <NavigationContainer>
        
        <If show={this.state.loading}>
          <ActivityIndicator size={'large'} color="#0000ff" />
        </If>
        <If show={this.state.loading === false}>
          {this.props.loggedIn ? appStack() : authStack()}
        </If>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootReducerState) => ({
  loggedIn: state.userReducer.loggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(UserActions.UserUpdateAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
