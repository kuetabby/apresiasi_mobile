import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {AuthContext} from 'src/context/Auth';

interface Props {}

export const useLogout = (): (boolean | (() => Promise<void>))[] => {
  const [loading, setLoading] = React.useState(false);

  const {signOut} = React.useContext(AuthContext);

  const onLogout = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('fbToken');
      const logout = new GraphRequest(
        'me/permissions/',
        {
          accessToken: accessToken ? accessToken : '',
          httpMethod: 'DELETE',
        },
        (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error.toString());
            setLoading(false);
          } else {
            setLoading(false);
            LoginManager.logOut();
            signOut();
          }
        },
      );
      new GraphRequestManager().addRequest(logout).start();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return [loading, onLogout];
};
