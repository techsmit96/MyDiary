import * as React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Container from '../components/Container';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import If from '../components/If';
import {PrimaryTheme} from '../styles/Themes';
import {pComponentStyles, lComponentStyles, Typography} from '../styles/Global';
import {Formik} from 'formik';
import {Validators} from '../utils/validators';
import {Utils} from '../utils/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';
import {Api} from '../services/Api';
import {connect} from 'react-redux';
import {AuthRepository} from '../services/AuthRepository';
import {RootReducerState} from '../redux/reducers';

interface State {
  form: {
    emailTextInput: string;
    passwordTextInput: string;
  };
  orientation: string;
}
interface Props {
  login: any;
  loggingIn: boolean;
}

class Login extends React.Component<Props, State> {
  private passwordInputRef;
  constructor(props) {
    super(props);
    this.state = {
      form: {
        emailTextInput: '',
        passwordTextInput: '',
      },
      orientation: 'portrait',
    };
  }

  // manually changes field
  // updateTextInput = (val, type) => {
  //   switch (type) {
  //     case InputType.EMAIL: {
  //       this.setState({ form: { ...this.state.form, emailTextInput: val } });
  //       break;
  //     }
  //     case InputType.PASSWORD: {
  //       this.setState({ form: { ...this.state.form, passwordTextInput: val } });
  //       break;
  //     }
  //   }
  // }

  componentDidMount(): void {
    listenOrientationChange(this);
  }
  componentWillUnmount(): void {
    removeOrientationListener();
  }

  handleLogin = () => {
    console.log('Login');
  };

  onLogin = (values) => {
    this.props.login({
      email: values.emailTextInput,
      password: values.passwordTextInput,
      returnSecureToken: true,
    });
  };

  render() {
    const pStyles = portraitStyles();
    const lStyles = landScapeStyles();
    return (
      <Container containerStyles={{alignItems: 'center'}}>
        <CustomText
          style={[
            Typography.title,
            {
              marginBottom: hp('2%'),
              letterSpacing: 5,
            },
          ]}>
          Login
        </CustomText>

        <Formik
          initialValues={this.state.form}
          validateOnMount={true}
          validateOnChange={true}
          onSubmit={(values) => this.onLogin(values)}
          validationSchema={Validators.loginValidator}>
          {(props) => {
            return (
              <View style={{alignItems: 'center'}}>
                <TextInput
                  onSubmitEditing={() => this.passwordInputRef.focus()}
                  returnKeyType={'next'}
                  onBlur={() => props.setFieldTouched('emailTextInput')}
                  onChangeText={props.handleChange('emailTextInput')}
                  style={Utils.dynamicStyles(
                    pComponentStyles.textInput,
                    lComponentStyles.textInput,
                    this.state.orientation,
                  )}
                  placeholder={'Email'}
                  value={props.values.emailTextInput}
                />

                <If show={props.dirty && props.touched.emailTextInput}>
                  <CustomText style={[Typography.errorText]}>
                    {props.errors.emailTextInput}
                  </CustomText>
                </If>

                <TextInput
                  onSubmitEditing={() => {
                    if (props.isValid) {
                      console.log('is valid');
                    } else {
                      console.log('form is not valid');
                    }
                  }}
                  ref={(ref) => (this.passwordInputRef = ref)}
                  returnKeyType={'done'}
                  onBlur={() => props.setFieldTouched('passwordTextInput')}
                  onChangeText={props.handleChange('passwordTextInput')}
                  style={Utils.dynamicStyles(
                    pComponentStyles.textInput,
                    lComponentStyles.textInput,
                    this.state.orientation,
                  )}
                  placeholder={'Password'}
                  value={props.values.passwordTextInput}
                />
                <If show={props.dirty && props.touched.passwordTextInput}>
                  <CustomText style={[Typography.errorText]}>
                    {props.errors.passwordTextInput}
                  </CustomText>
                </If>
                <CustomButton
                  useIcon={true}
                  iconName={'key'}
                  disabled={!props.isValid}
                  title={'Login'}
                  onPress={() => {
                    if (props.isValid) {
                      console.log('is valid');
                      return props.handleSubmit();
                    } else {
                      console.log('form is not valid');
                    }
                  }}
                />
                <If show={this.props.loggingIn}>
                  <ActivityIndicator size={'large'} color="#0000ff" />
                </If>
              </View>
            );
          }}
        </Formik>
      </Container>
    );
  }
}
const portraitStyles = () => {
  return StyleSheet.create({});
};

const landScapeStyles = () => {
  return StyleSheet.create({});
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(AuthRepository.login(data)),
});
const mapStateToProps = (state: RootReducerState) => ({
  loggingIn: state.userReducer.loggingIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
