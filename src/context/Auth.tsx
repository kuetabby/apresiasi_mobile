import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager} from 'react-native-fbsdk';

export const AuthContext = createContext({});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORING_TOKEN':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'RESTORED_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: false,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    dispatch({type: 'RESTORING_TOKEN'});
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      dispatch({type: 'RESTORED_TOKEN', token: userToken});
    } catch (e) {
      signOut();
      console.log(e);
      // Restoring token failed
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  const signIn = async ({
    token,
    facebook_token,
  }: {
    token: string;
    facebook_token: string;
  }) => {
    dispatch({type: 'RESTORING_TOKEN'});
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('fbToken', facebook_token);
      dispatch({type: 'SIGN_IN', token});
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('fbToken');
    LoginManager.logOut();
    dispatch({type: 'SIGN_OUT'});
  };

  const signUp = async () => {
    await AsyncStorage.setItem('userToken', 'dummy-auth-token');
    dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        bootstrapAsync,
        signIn,
        signOut,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
