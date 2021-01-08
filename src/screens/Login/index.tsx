import React, {useContext, useState} from 'react';

import {useMutation} from '@apollo/client';
import {StyleSheet, Alert, View, ToastAndroid, BackHandler} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {AuthContext} from 'src/context/Auth';
import {LOGIN} from 'src/queries/Auth';
import {useFocusEffect} from '@react-navigation/native';

interface Props {}

const Login: React.FC<Props> = () => {
  const {signIn} = useContext(AuthContext);

  const [facebookToken, setFacebookToken] = useState<string | undefined>('');

  useFocusEffect(
    React.useCallback(() => {
      let currentCount = 0;
      const onBackPress = () => {
        if (currentCount < 1) {
          currentCount += 1;
          ToastAndroid.showWithGravity(
            'Press again to close!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          BackHandler.exitApp();
          // exit the app here using BackHandler.exitApp();
        }
        setTimeout(() => {
          currentCount = 0;
        }, 1500);

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // ...

  const [LoginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data?.loginUser?.accessToken;
      if (token) {
        signIn({
          token,
          facebook_token: facebookToken,
        });
      }
    },
  });

  const onLogin = (error, result) => {
    if (error) {
      Alert.alert(`${result.error}`);
    } else if (result.isCancelled) {
      Alert.alert('Login Cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        const token = data?.accessToken;
        setFacebookToken(token);
        requestInfo();
      });
    }
  };

  const responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + JSON.stringify(error));
    } else {
      const {email, name} = JSON.parse(JSON.stringify(result));
      LoginUser({
        variables: {
          email,
          name,
        },
      });
    }
  };

  const requestInfo = () => {
    let request = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
          fields: {
            string: 'email,name',
          },
        },
      },
      responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(request).start();
  };

  return (
    <View style={{backgroundColor: '#fff', height: hp('100%')}}>
      <Div
        justifyContent="center"
        alignItems="center"
        style={{height: hp('50%')}}>
        <Text style={{fontFamily: 'Roboto-Bold'}} fontSize="4xl">
          Login
        </Text>
        <Text mt={10} style={{fontFamily: 'Roboto-Regular'}}>
          With your social media account
        </Text>
        <Div mt={20}>
          <LoginButton
            loginBehaviorAndroid="native_with_fallback"
            loginBehaviorIOS="browser"
            permissions={['email', 'public_profile']}
            onLoginFinished={onLogin}
            defaultAudience="everyone"
          />
        </Div>
      </Div>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
