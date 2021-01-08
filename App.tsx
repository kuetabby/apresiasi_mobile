/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ThemeProvider} from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {AuthProvider} from 'src/context/Auth';

import Routes from 'src/routes';

declare const global: {HermesInternal: null | {}};

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: `https://apresiasi.herokuapp.com/graphql`,
});

const authMiddleware = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('userToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: authMiddleware.concat(link),

  // Provide some optional constructor fields
  // name: 'react-web-client',
  // version: '1.3',
  // queryDeduplication: false,
});

const App = () => {
  return (
    <>
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <ThemeProvider>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
