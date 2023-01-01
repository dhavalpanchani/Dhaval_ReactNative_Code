import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { setAuthTokenAction } from '../../store/auth';
import useApiErrorsHandler from '../../hooks/useApiErrorHandler';
import { setAuthToken } from '../../helpers/auth';
import { login } from '../../resources/baseServices/auth';
import Block from '../../components/utilities/Block';
import Text from '../../components/utilities/Text';
import { responsiveScale } from '../../styles/mixins';
import { colors } from '../../styles/theme';

const LogIn = ({ navigation }) => {
  const handleApiError = useApiErrorsHandler();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [showAndHideRememberMe, setShowAndHideRememberMe] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLoginBtn = async () => {
    if (email === '') {
      Alert.alert('Alert', 'Please enter email');
    } else if (!validateEmail(email)) {
      Alert.alert('Alert', 'Please enter valid email !');
    } else if (password === '') {
      Alert.alert('Alert', 'Please enter password');
    } else {
      setIsLoginLoading(true);
      const data = {
        email: email,
        password: password,
      };
      try {
        const res = await login(data);
        dispatch(setAuthTokenAction(res?.data?.token));
        await setAuthToken(res?.data?.token);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoginLoading(false);
      }
    }
  };

  // Email validation
  const validateEmail = Email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(Email);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Block flex={1} color={colors.viewBackgroundColor}>
      <SafeAreaView />
      <Block flex={1} margin={[20]}>
        <Block flex={false} width={'100%'} style={styles.appLogoMainView}>
          <Block flex={false} width={'100%'} row center>
            <Block flex={false} height={45} width={45}>
              <Image
                source={require('../../assets/appImages/apple-icon.png')}
                style={styles.logoStyles}
              />
            </Block>
            <Text
              center
              size={responsiveScale(16)}
              color={colors.logoTextColor}
              bold
              style={styles.weWorkText}
            >
              e Work
            </Text>
          </Block>
        </Block>
        <Block flex={false} margin={[30, 0, 0, 0]}>
          <Text size={responsiveScale(16)} medium>
            Sign in to WeWork
          </Text>
          <Text
            size={responsiveScale(15)}
            color={colors.mediumHeadingTextColor}
            style={styles.enterDetailsText}
          >
            Enter your details below.
          </Text>
        </Block>
        <Block flex={false} margin={[30, 0, 0, 0]}>
          <Block flex={false} margin={[0, 0, 0, 0]}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.commanTextInputSty}
              keyboardType={'email-address'}
            />
          </Block>

          <Block flex={false} margin={[10, 0, 0, 0]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={[styles.commanTextInputSty]}
            />
          </Block>
        </Block>

        <Block flex={false} row center between margin={[20, 0, 0, 0]}>
          <TouchableOpacity
            style={styles.remeberText}
            onPress={() => setShowAndHideRememberMe(!showAndHideRememberMe)}
          >
            <TouchableOpacity
              style={styles.checkBoxBtn}
              onPress={() => setShowAndHideRememberMe(!showAndHideRememberMe)}
            >
              {showAndHideRememberMe ? (
                <Image
                  source={require('@assets/appImages/empty-checkbox.png')}
                  style={styles.ImgSty}
                />
              ) : (
                <Image
                  source={require('@assets/appImages/Check-box.png')}
                  style={styles.ImgSty}
                />
              )}
            </TouchableOpacity>

            <Text
              size={responsiveScale(14)}
              regular
              style={styles.rememberMeText}
            >
              Remember me
            </Text>
          </TouchableOpacity>
        </Block>
        <TouchableOpacity
          onPress={() => handleLoginBtn()}
          style={styles.logInBtn}
        >
          {isLoginLoading ? (
            <Block flex={false}>
              <ActivityIndicator size={25} color={colors.loaderColor} />
            </Block>
          ) : (
            <Text
              size={responsiveScale(14)}
              bold
              color={colors.buttonTextColor}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>

        <Block flex={false} margin={[30, 0, 0, 0]} row center middle>
          <Text
            color={colors.mediumHeadingTextColor}
            center
            size={responsiveScale(14)}
            regular
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              color={colors.logoTextColor}
              center
              medium
              size={responsiveScale(14)}
              style={styles.getStartedText}
            >
              GetStarted
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default LogIn;
const styles = StyleSheet.create({
  commanTextInputSty: {
    backgroundColor: colors.textInputBackgroundColor,
    height: 40,
    fontSize: 16,
    color: colors.mediumTextColor,
    borderWidth: 1,
    borderColor: colors.borderDarkColor,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logInBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.largeButtonColor,
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    shadowColor: colors.largeButtonColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  ImgSty: {
    height: '100%',
    width: '100%',
    tintColor: colors.logoTextColor,
  },
  appLogoMainView: { aspectRatio: 3 },
  logoStyles: {
    height: '100%',
    width: '100%',
  },
  weWorkText: { marginTop: 10, right: 4 },
  enterDetailsText: { marginTop: 10 },
  remeberText: { flexDirection: 'row' },
  checkBoxBtn: { height: 20, width: 20 },
  rememberMeText: { left: 10 },
  getStartedText: { left: 5 },
});
