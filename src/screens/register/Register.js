import React, { useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setAuthTokenAction } from '../../store/auth';
import useApiErrorsHandler from '../../hooks/useApiErrorHandler';
import { setAuthToken } from '../../helpers/auth';
import { register } from '../../resources/baseServices/auth';
import Block from '../../components/utilities/Block';
import Text from '../../components/utilities/Text';
import { responsiveScale } from '../../styles/mixins';
import { colors } from '../../styles/theme';

const Register = ({ navigation }) => {
  const handleApiError = useApiErrorsHandler();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [isGetWesafeLoading, setIsGetWesafeLoading] = useState(false);

  const handleGetStartedBtn = async () => {
    if (email === '') {
      Alert.alert('Alert', 'Please enter email');
    } else if (!validateEmail(email)) {
      Alert.alert('Alert', 'Please enter valid email !');
    } else if (password === '') {
      Alert.alert('Alert', 'Please enter password');
    } else {
      setIsGetWesafeLoading(true);
      const data = {
        email: email,
        password: password,
      };
      try {
        const res = await register(data);
        dispatch(setAuthTokenAction(res?.data?.token));
        await setAuthToken(res?.data?.token);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsGetWesafeLoading(false);
      }
    }
  };

  // Email validation
  const validateEmail = Email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(Email);
  };

  return (
    <Block flex={1} color={colors.viewBackgroundColor}>
      <SafeAreaView />
      <Block flex={1} margin={[20]}>
        <Block flex={false} width={'100%'} style={styles.appLogoMainView}>
          <Block flex={false} width={'100%'} row center>
            <Block flex={false} height={45} width={45}>
              <Image
                source={require('../../assets/appImages/apple-icon.png')}
                style={styles.ImgSty}
              />
            </Block>
            <Text
              center
              size={responsiveScale(16)}
              color={colors.logoTextColor}
              style={styles.eWorkText}
            >
              e Work
            </Text>
          </Block>
        </Block>
        <Block flex={false} margin={[0, 0, 0, 0]}>
          <Text size={responsiveScale(16)}>Get started with WeWork.</Text>
          <Text
            size={responsiveScale(15)}
            color={colors.mediumHeadingTextColor}
            style={styles.detailsText}
          >
            First let's get some details.
          </Text>
        </Block>
        <Block flex={false} margin={[30, 0, 0, 0]}>
          <Block flex={false} margin={[15, 0, 0, 0]}>
            <TextInput
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              style={styles.commanTextInputSty}
            />
          </Block>
          <Block flex={false} margin={[10, 0, 0, 0]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={styles.commanTextInputSty}
            />
          </Block>
        </Block>
        <TouchableOpacity
          onPress={() => handleGetStartedBtn()}
          style={styles.getStartedBtn}
        >
          {isGetWesafeLoading ? (
            <Block flex={false}>
              <ActivityIndicator size={25} color={colors.loaderColor} />
            </Block>
          ) : (
            <Text size={responsiveScale(14)} color={colors.buttonTextColor}>
              Let's Get WeWork!
            </Text>
          )}
        </TouchableOpacity>
        <Block flex={false} margin={[20, 0, 0, 0]} center middle>
          <Text
            color={colors.subHeadingTextColor}
            center
            size={responsiveScale(14)}
          >
            By registering, I agree to WeWork Terms of
          </Text>
          <Text
            color={colors.subHeadingTextColor}
            center
            size={responsiveScale(14)}
          >
            Service and Privacy Policy.
          </Text>
        </Block>
        <Block flex={false} margin={[20, 0, 0, 0]} row center middle>
          <Text
            color={colors.mediumHeadingTextColor}
            center
            size={responsiveScale(14)}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              color={colors.logoTextColor}
              center
              size={responsiveScale(14)}
              style={styles.loginText}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default Register;

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
  ImgSty: {
    height: '100%',
    width: '100%',
  },

  getStartedBtn: {
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
  appLogoMainView: { aspectRatio: 3 },
  eWorkText: { marginTop: 10, right: 4 },
  detailsText: { marginTop: 10 },
  loginText: { left: 5 },
});
